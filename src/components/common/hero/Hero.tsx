import { cn } from "@/lib/utils";

import type { HeroProps } from "./Hero.types";

export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media,
  className,
  contentClassName,
}: HeroProps) {
  return (
    <section
      className={cn(
        "grid min-h-[520px] items-center gap-10 bg-[var(--background)] px-6 py-16 text-[var(--text)] lg:grid-cols-[1.1fr_0.9fr] lg:px-16",
        className,
      )}
    >
      <div className={cn("max-w-3xl", contentClassName)}>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            {description}
          </p>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {media ? <div className="min-w-0">{media}</div> : null}
    </section>
  );
}
