import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PaymentMethodItem } from "./data";

export function PaymentMethodCard({ method, onEdit, onRemove }: { method: PaymentMethodItem; onEdit: (id: string) => void; onRemove: (id: string) => void }) {
  return (
    <Card className="border-border/80 bg-background shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{method.type}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">{method.name}</div>
        <div className="text-sm font-medium text-foreground">{method.detail}</div>
        <div className="text-sm text-emerald-700 dark:text-emerald-400">{method.status}</div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => onEdit(method.id)}>Edit</Button>
          <Button variant="outline" size="sm" onClick={() => onRemove(method.id)}>Remove</Button>
        </div>
      </CardContent>
    </Card>
  );
}
