import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PaymentModal({ invoice, onClose, onConfirm }: { invoice?: { id: string; supplier: string; amount: string }; onClose: () => void; onConfirm: () => void }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <Card className="w-full max-w-md border-border/80 bg-background shadow-xl" onClick={(event) => event.stopPropagation()}>
        <CardHeader>
          <CardTitle className="text-lg">Confirm payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-4 text-sm">
            <div className="flex items-center justify-between"><span>Invoice</span><span className="font-semibold">{invoice.id}</span></div>
            <div className="mt-2 flex items-center justify-between"><span>Supplier</span><span className="font-semibold">{invoice.supplier}</span></div>
            <div className="mt-2 flex items-center justify-between"><span>Amount</span><span className="font-semibold">{invoice.amount}</span></div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select payment method</label>
            <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option>Bank Transfer</option>
              <option>Mobile Money</option>
              <option>Card</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm}>Confirm Payment</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
