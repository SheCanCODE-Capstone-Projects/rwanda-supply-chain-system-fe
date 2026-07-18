import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function FarmerPage() {
  return (
    <RoleLayout role={UserRole.FARMER}>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Producer Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Overview of your farm operations and market activity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active listings" value="24" change="+3 this week" positive />
          <StatCard label="Pending orders" value="8" change="+2 today" positive />
          <StatCard label="Tons in storage" value="12.4" change="-1.2 this week" positive={false} />
          <StatCard label="Revenue (RWF)" value="1.2M" change="+8.4% vs last month" positive />
        </div>

        {/* Recent orders table */}
        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Recent orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Buyer</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { product: "Maize", qty: "4 tons", buyer: "Kigali Markets Ltd", status: "In transit" },
                  { product: "Coffee beans", qty: "800 kg", buyer: "Export Co.", status: "Delivered" },
                  { product: "Soybeans", qty: "2.5 tons", buyer: "Musanze Coop", status: "Pending" },
                ].map((row) => (
                  <tr key={row.product} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-medium text-[--text]">{row.product}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.qty}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.buyer}</td>
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
    "In transit": "bg-[--info-bg] text-[--info]",
    Delivered: "bg-[--success-bg] text-[--success]",
    Pending: "bg-[--warning-bg] text-[--warning]",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? "bg-[--surface] text-[--text-secondary]"}`}
    >
      {status}
    </span>
  );
}
