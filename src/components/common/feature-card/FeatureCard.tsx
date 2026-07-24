import Link from "next/link";

import { cn } from "@/lib/utils";

import type { FeatureCardProps } from "./FeatureCard.types";

export function FeatureCard({
  title,
  description,
  icon,
  href,
  meta,
  className,
}: FeatureCardProps) {
  const content = (
    <article
      className={cn(
        "h-full rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm transition hover:border-[var(--primary)]/40",
        className,
      )}
    >
      {icon ? <div className="mb-4 text-[var(--primary)]">{icon}</div> : null}
      {meta ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
          {meta}
        </p>
      ) : null}
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
        {description}
      </p>
    </article>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
