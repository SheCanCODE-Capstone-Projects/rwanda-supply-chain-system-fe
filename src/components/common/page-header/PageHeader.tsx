import { cn } from "@/lib/utils";

import type { PageHeaderProps } from "./PageHeader.types";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-[var(--border)] bg-white px-6 py-8 text-[var(--text)]",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {breadcrumbs ? <div className="mb-4">{breadcrumbs}</div> : null}
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-2 text-3xl font-semibold leading-tight">{title}</h1>
          {description ? (
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </header>
  );
}
