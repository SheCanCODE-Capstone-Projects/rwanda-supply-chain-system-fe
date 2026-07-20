"use client";
import { createContext, useContext, useCallback, useRef, useState, type ReactNode } from "react";

// Lightweight async query manager — no extra dependencies needed.
// Swap for @tanstack/react-query later if the project grows.

type QueryState<T> = {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
};

type QueryContextValue = {
  invalidate: (key: string) => void;
  getState: <T>(key: string) => QueryState<T> | undefined;
};

const QueryContext = createContext<QueryContextValue | null>(null);

// Global cache shared across the tree
const cache = new Map<string, QueryState<unknown>>();
const listeners = new Map<string, Set<() => void>>();

function notify(key: string) {
  listeners.get(key)?.forEach((l) => l());
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const invalidate = useCallback((key: string) => {
    cache.delete(key);
    notify(key);
  }, []);

  const getState = useCallback(<T,>(key: string) => {
    return cache.get(key) as QueryState<T> | undefined;
  }, []);

  return (
    <QueryContext.Provider value={{ invalidate, getState }}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQueryContext(): QueryContextValue {
  const ctx = useContext(QueryContext);
  if (!ctx) throw new Error("useQueryContext must be used inside <QueryProvider>");
  return ctx;
}

/**
 * Simple data-fetching hook backed by QueryProvider's cache.
 *
 * @example
 * const { data, isLoading, error } = useQuery("products", fetchProducts);
 */
export function useQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
) {
  const ctx = useContext(QueryContext);
  const [, forceUpdate] = useState(0);
  const inFlight = useRef(false);

  // Register listener for cache invalidation
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(() => forceUpdate((n) => n + 1));

  const existing = cache.get(key) as QueryState<T> | undefined;

  if (!existing && !inFlight.current) {
    inFlight.current = true;
    cache.set(key, { data: undefined, error: null, isLoading: true });
    fetcher()
      .then((data) => {
        cache.set(key, { data, error: null, isLoading: false });
      })
      .catch((err: unknown) => {
        cache.set(key, { data: undefined, error: err instanceof Error ? err : new Error(String(err)), isLoading: false });
      })
      .finally(() => {
        inFlight.current = false;
        notify(key);
      });
  }

  void ctx; // keep context in scope
  void deps; // caller can pass deps to trigger re-fetch via invalidate

  return (cache.get(key) ?? { data: undefined, error: null, isLoading: true }) as QueryState<T>;
}
