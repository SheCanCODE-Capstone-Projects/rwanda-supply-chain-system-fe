import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ErrorStateProps } from "./ErrorState.types";

export function ErrorState({
  title = "Something went wrong",
  description,
  action,
  className,
}: ErrorStateProps) {
  return (
    <section
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-lg border border-[var(--border)] bg-white p-8 text-center",
        className,
      )}
    >
      <AlertTriangle className="h-8 w-8 text-[var(--danger)]" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-[var(--text)]">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
