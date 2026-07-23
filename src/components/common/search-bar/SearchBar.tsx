"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import type { SearchBarProps } from "./SearchBar.types";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  disabled,
  className,
  inputClassName,
}: SearchBarProps) {
  return (
    <label
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-md border border-[var(--border)] bg-white px-3 text-[var(--text)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/15",
        disabled && "opacity-60",
        className,
      )}
    >
      <Search className="h-4 w-4 text-[var(--text-secondary)]" aria-hidden="true" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-secondary)]",
          inputClassName,
        )}
        type="search"
      />
    </label>
  );
}
