"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { PaginationState } from "@/types";
import { DEFAULT_PAGE_SIZE } from "@/constants";

// ─── useDebounce ──────────────────────────────────────────────────────────────
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── useSearch ────────────────────────────────────────────────────────────────
export function useSearch<T>(items: T[], keys: (keyof T)[]) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query);
  const results = useMemo(() => {
    if (!debounced.trim()) return items;
    const q = debounced.toLowerCase();
    return items.filter((item) =>
      keys.some((k) => String(item[k] ?? "").toLowerCase().includes(q))
    );
  }, [items, keys, debounced]);
  return { query, setQuery, results };
}

// ─── usePagination ────────────────────────────────────────────────────────────
export function usePagination<T>(items: T[], pageSize = DEFAULT_PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const paginated = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize]
  );
  const state: PaginationState = { page, pageSize, total: items.length };
  const goTo = useCallback((p: number) => setPage(Math.min(Math.max(1, p), totalPages)), [totalPages]);
  return { paginated, state, totalPages, goTo, prev: () => goTo(page - 1), next: () => goTo(page + 1) };
}

// ─── useFilters ───────────────────────────────────────────────────────────────
export function useFilters<T extends Record<string, unknown>>(items: T[]) {
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});
  const filtered = useMemo(() =>
    items.filter((item) =>
      Object.entries(filters).every(([k, v]) => !v || String(item[k]) === v)
    ), [items, filters]);
  const setFilter = useCallback((key: keyof T, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value })), []);
  const clearFilters = useCallback(() => setFilters({}), []);
  return { filters, filtered, setFilter, clearFilters };
}

// ─── useSorting ───────────────────────────────────────────────────────────────
export function useSorting<T>(items: T[]) {
  const [sort, setSort] = useState<{ key: keyof T; dir: "asc" | "desc" } | null>(null);
  const sorted = useMemo(() => {
    if (!sort) return items;
    return [...items].sort((a, b) => {
      const av = String(a[sort.key] ?? "");
      const bv = String(b[sort.key] ?? "");
      return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [items, sort]);
  const toggleSort = useCallback((key: keyof T) =>
    setSort((prev) => prev?.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }), []);
  return { sort, sorted, toggleSort };
}

// ─── useModal ─────────────────────────────────────────────────────────────────
export function useModal<T = unknown>() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | undefined>();
  const show = useCallback((d?: T) => { setData(d); setOpen(true); }, []);
  const hide = useCallback(() => { setOpen(false); setData(undefined); }, []);
  return { open, data, show, hide };
}

// ─── useOutsideClick ─────────────────────────────────────────────────────────
export function useOutsideClick(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

// ─── useDarkMode ─────────────────────────────────────────────────────────────
export { useTheme as useDarkMode } from "@/lib/theme";

// ─── useLanguage ─────────────────────────────────────────────────────────────
export { useLang as useLanguage, useT } from "@/lib/i18n";
