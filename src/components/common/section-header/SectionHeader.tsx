import { cn } from "@/lib/utils";

import type { SectionHeaderProps } from "./SectionHeader.types";

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 text-[var(--text)]",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-semibold leading-tight">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
