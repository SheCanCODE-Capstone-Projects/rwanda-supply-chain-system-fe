import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function RetailerPage() {
  return (
    <RoleLayout role={UserRole.RETAILER}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Retailer Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Monitor your procurement, stock levels, and sales activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active orders" value="12" change="+4 this week" positive />
          <StatCard label="Low stock items" value="3" change="Reorder needed" positive={false} />
          <StatCard label="Monthly spend (RWF)" value="2.4M" change="+6% vs last month" positive={false} />
          <StatCard label="Suppliers" value="8" change="2 new" positive />
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
                  <th className="px-5 py-3">Item</th>
                  <th className="px-5 py-3">Supplier</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Total (RWF)</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { item: "Rice 50kg bags", supplier: "Nyagatare Farms", qty: "200 bags", total: "600,000", status: "Delivered" },
                  { item: "Cooking oil 5L", supplier: "Kigali Oils Ltd", qty: "150 units", total: "450,000", status: "In transit" },
                  { item: "Sugar 1kg", supplier: "Bugesera Coop", qty: "500 units", total: "350,000", status: "Pending" },
                ].map((row) => (
                  <tr key={row.item} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-medium text-[--text]">{row.item}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.supplier}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.qty}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.total}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          row.status === "Delivered"
                            ? "bg-[--success-bg] text-[--success]"
                            : row.status === "In transit"
                              ? "bg-[--info-bg] text-[--info]"
                              : "bg-[--warning-bg] text-[--warning]"
                        }`}
                      >
                        {row.status}
                      </span>
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
