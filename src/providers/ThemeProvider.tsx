"use client";

import { useEffect, type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { initTheme } from "@/lib/theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
