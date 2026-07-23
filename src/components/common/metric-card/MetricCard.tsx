import { cn } from "@/lib/utils";

import type { MetricCardProps } from "./MetricCard.types";

export function MetricCard({
  label,
  value,
  change,
  helpText,
  icon,
  className,
}: MetricCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
        </p>
        {icon ? <div className="text-[var(--primary)]">{icon}</div> : null}
      </div>
      <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{value}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        {change ? <span className="font-medium text-[var(--primary)]">{change}</span> : null}
        {helpText ? (
          <span className="text-[var(--text-secondary)]">{helpText}</span>
        ) : null}
      </div>
    </article>
  );
}
