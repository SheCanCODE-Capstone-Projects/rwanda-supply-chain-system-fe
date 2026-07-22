"use client";

import { type ReactNode } from "react";

/**
 * QueryProvider — placeholder for a future data-fetching layer.
 *
 * If you add @tanstack/react-query, replace the children pass-through
 * with a <QueryClientProvider client={queryClient}> wrapper.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
