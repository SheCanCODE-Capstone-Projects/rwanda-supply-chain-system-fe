"use client";
import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
const KEY = "rscn.theme.v1";

const listeners = new Set<() => void>();
let current: Theme = "light";

function apply(t: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", t === "dark");
}

export function initTheme() {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(KEY) as Theme | null;
  const sys = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  current = stored ?? sys;
  apply(current);
}

export function setTheme(t: Theme) {
  current = t;
  if (typeof window !== "undefined") localStorage.setItem(KEY, t);
  apply(t);
  listeners.forEach((l) => l());
}

export function toggleTheme() { setTheme(current === "dark" ? "light" : "dark"); }
export function getTheme(): Theme { return current; }

export function useTheme(): Theme {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => current,
    () => "light",
  );
}
