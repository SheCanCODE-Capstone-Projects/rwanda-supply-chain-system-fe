import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const tone = {
    Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Processing: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    Shipping: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    Delivered: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Cancelled: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  }[status] ?? "bg-slate-500/10 text-slate-600 dark:text-slate-400";

  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", tone)}>{status}</span>;
}
