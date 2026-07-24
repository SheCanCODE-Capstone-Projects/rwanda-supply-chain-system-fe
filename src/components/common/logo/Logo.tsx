import Link from "next/link";

import { cn } from "@/lib/utils";

import type { LogoProps } from "./Logo.types";

export function Logo({
  href = "/",
  label = "RSCN",
  showText = true,
  className,
  markClassName,
  textClassName,
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md bg-[var(--primary)] text-sm font-semibold text-white",
          markClassName,
        )}
        aria-hidden="true"
      >
        R
      </span>
      {showText ? (
        <span
          className={cn("text-lg font-semibold text-[var(--text)]", textClassName)}
        >
          {label}
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} aria-label={label}>
      {content}
    </Link>
  );
}
