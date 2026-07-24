import { cn } from "@/lib/utils";

import type { FilterBarProps } from "./FilterBar.types";

export function FilterBar({
  search,
  filters,
  actions,
  className,
}: FilterBarProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 flex-1">{search}</div>
      {filters ? (
        <div className="flex flex-wrap items-center gap-2">{filters}</div>
      ) : null}
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </section>
  );
}
