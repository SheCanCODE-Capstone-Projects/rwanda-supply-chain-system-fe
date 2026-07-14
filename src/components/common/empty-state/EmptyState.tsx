import { cn } from "@/lib/utils";

import type { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-white p-8 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-4 text-[var(--primary)]">{icon}</div> : null}
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
