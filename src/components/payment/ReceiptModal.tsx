import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReceiptModal({ transaction, onClose }: { transaction?: { id: string; amount: string; method: string; date: string }; onClose: () => void }) {
  if (!transaction) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <Card className="w-full max-w-md border-border/80 bg-background shadow-xl" onClick={(event) => event.stopPropagation()}>
        <CardHeader>
          <CardTitle className="text-lg">Receipt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between"><span>Transaction</span><span className="font-semibold">{transaction.id}</span></div>
            <div className="mt-2 flex items-center justify-between"><span>Amount</span><span className="font-semibold">{transaction.amount}</span></div>
            <div className="mt-2 flex items-center justify-between"><span>Method</span><span className="font-semibold">{transaction.method}</span></div>
            <div className="mt-2 flex items-center justify-between"><span>Date</span><span className="font-semibold">{transaction.date}</span></div>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
