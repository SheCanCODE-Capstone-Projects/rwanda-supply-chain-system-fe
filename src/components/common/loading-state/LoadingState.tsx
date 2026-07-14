import { Spinner } from "@/components/ui";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({
  label = "Loading",
  className,
}: LoadingStateProps) {
  return (
    <section
      className={cn(
        "flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border border-[var(--border)] bg-white p-8 text-center",
        className,
      )}
    >
      <div className="scale-125">
        <Spinner />
      </div>
      <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
    </section>
  );
}
