import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InvoiceDetailsModal({ invoice, onClose }: { invoice?: { id: string; supplier: string; amount: string; products: string; date: string; status: string }; onClose: () => void }) {
  if (!invoice) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <Card className="w-full max-w-2xl border-border/80 bg-background shadow-xl" onClick={(event) => event.stopPropagation()}>
        <CardHeader>
          <CardTitle className="text-lg">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="font-semibold text-foreground">Invoice Number</div>
              <div className="mt-1">{invoice.id}</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="font-semibold text-foreground">Payment Status</div>
              <div className="mt-1">{invoice.status}</div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="font-semibold text-foreground">Supplier</div>
            <div className="mt-1">{invoice.supplier}</div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="font-semibold text-foreground">Products</div>
            <div className="mt-1">{invoice.products}</div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div>
              <div className="font-semibold text-foreground">Total Amount</div>
              <div className="mt-1">{invoice.amount}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-foreground">Issued</div>
              <div className="mt-1">{invoice.date}</div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button>Download Invoice</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
