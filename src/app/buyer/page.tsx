import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function BuyerPage() {
  return (
    <RoleLayout role={UserRole.BUYER}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Buyer Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Browse the marketplace, manage purchase orders, and track deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Open orders" value="7" change="+2 this week" positive />
          <StatCard label="Pending payments" value="3" change="RWF 1.2M due" positive={false} />
          <StatCard label="Suppliers used" value="11" positive />
          <StatCard label="Spend this month" value="RWF 3.4M" change="-5% vs last month" positive />
        </div>

        {/* Purchase orders */}
        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Recent purchase orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Supplier</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { id: "PO-1042", product: "Maize flour", supplier: "Kigali Mills", amount: "540,000", status: "Delivered" },
                  { id: "PO-1041", product: "Sunflower oil", supplier: "East Africa Oils", amount: "320,000", status: "In transit" },
                  { id: "PO-1040", product: "Sugar", supplier: "Bugesera Coop", amount: "210,000", status: "Processing" },
                  { id: "PO-1039", product: "Rice (25kg)", supplier: "Nyagatare Farms", amount: "780,000", status: "Delivered" },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-mono text-xs text-[--text-secondary]">{row.id}</td>
                    <td className="px-5 py-3 font-medium text-[--text]">{row.product}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.supplier}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">RWF {row.amount}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "bg-[--success-bg] text-[--success]",
    "In transit": "bg-[--info-bg] text-[--info]",
    Processing: "bg-[--warning-bg] text-[--warning]",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? "bg-[--surface] text-[--text-secondary]"}`}>
      {status}
    </span>
  );
}
