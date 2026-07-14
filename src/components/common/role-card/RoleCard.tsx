import Link from "next/link";

import { cn } from "@/lib/utils";

import type { RoleCardProps } from "./RoleCard.types";

export function RoleCard({
  title,
  description,
  role,
  href,
  icon,
  ctaLabel = "Open",
  className,
}: RoleCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        {icon ? <div className="text-[var(--primary)]">{icon}</div> : null}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
            {role}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            {description}
          </p>
        </div>
      </div>
      {href ? (
        <Link
          href={href}
          className="mt-5 inline-flex text-sm font-medium text-[var(--primary)]"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </article>
  );
}
