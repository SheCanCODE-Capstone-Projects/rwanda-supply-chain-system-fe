import { cn } from "@/lib/utils";

import type { StatCardProps } from "./StatCard.types";

const toneClasses = {
  neutral: "text-[var(--text-secondary)]",
  success: "text-[var(--success)]",
  warning: "text-[var(--warning)]",
  danger: "text-[var(--danger)]",
};

export function StatCard({
  label,
  value,
  description,
  trend,
  icon,
  tone = "neutral",
  className,
}: StatCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold text-[var(--text)]">
            {value}
          </p>
        </div>
        {icon ? <div className="text-[var(--primary)]">{icon}</div> : null}
      </div>
      {description ? (
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          {description}
        </p>
      ) : null}
      {trend ? (
        <p className={cn("mt-4 text-sm font-medium", toneClasses[tone])}>
          {trend}
        </p>
      ) : null}
    </article>
  );
}
