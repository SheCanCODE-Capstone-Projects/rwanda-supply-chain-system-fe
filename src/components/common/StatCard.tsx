import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  className?: string;
}

export function StatCard({ label, value, change, positive = true, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[--border] bg-white p-5 shadow-sm",
        className,
      )}
    >
      <p className="text-sm text-[--text-secondary]">{label}</p>
      <p className="mt-2 text-3xl font-bold text-[--text]">{value}</p>
      {change && (
        <p
          className={cn(
            "mt-1 text-xs font-medium",
            positive ? "text-[--success]" : "text-[--danger]",
          )}
        >
          {change}
        </p>
      )}
    </div>
  );
}
