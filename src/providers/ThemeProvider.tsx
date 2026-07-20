"use client";
import { useEffect, type ReactNode } from "react";
import { initTheme } from "@/lib/theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initTheme();
  }, []);

  return <>{children}</>;
}