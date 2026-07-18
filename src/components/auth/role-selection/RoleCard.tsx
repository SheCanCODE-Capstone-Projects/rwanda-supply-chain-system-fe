"use client";

import { cn } from "@/lib/utils";
import type { RoleCardProps } from "./RoleCard.types";

export function RoleCard({
  role,
  label,
  description,
  icon,
  selected,
  onSelect,
}: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(role)}
      className={cn(
        "group relative flex w-full flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-200",
        "hover:border-[--primary] hover:bg-[--primary-light] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary]",
        selected
          ? "border-[--primary] bg-[--primary-light] shadow-md"
          : "border-[--border] bg-white",
      )}
      aria-pressed={selected}
    >
      {/* Selection indicator */}
      <span
        className={cn(
          "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200",
          selected
            ? "border-[--primary] bg-[--primary]"
            : "border-[--border] bg-white",
        )}
        aria-hidden="true"
      >
        {selected && (
          <svg
            className="h-3 w-3 text-white"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      {/* Icon */}
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200",
          selected
            ? "bg-[--primary] text-white"
            : "bg-[--surface] text-[--primary] group-hover:bg-[--primary] group-hover:text-white",
        )}
      >
        {icon}
      </span>

      {/* Text */}
      <div>
        <p
          className={cn(
            "text-sm font-semibold transition-colors duration-200",
            selected ? "text-[--primary]" : "text-[--text]",
          )}
        >
          {label}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-[--text-secondary]">
          {description}
        </p>
      </div>
    </button>
  );
}
