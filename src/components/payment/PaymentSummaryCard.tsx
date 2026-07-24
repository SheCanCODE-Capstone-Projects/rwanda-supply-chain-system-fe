import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function PaymentSummaryCard({ label, value, detail, icon: Icon, trend }: { label: string; value: string; detail: string; icon: LucideIcon; trend: string }) {
  return (
    <Card className="border-border/80 bg-background shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
          </div>
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <ArrowUpRight className="h-3.5 w-3.5" /> {trend}
        </div>
      </CardContent>
    </Card>
  );
}
