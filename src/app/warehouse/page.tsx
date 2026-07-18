import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function WarehousePage() {
  return (
    <RoleLayout role={UserRole.WAREHOUSE}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Warehouse Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Track storage capacity, inventory levels, and inbound/outbound activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total capacity (tons)" value="500" />
          <StatCard label="Current stock (tons)" value="342" change="68% utilised" positive />
          <StatCard label="Inbound today" value="24t" change="+3 shipments" positive />
          <StatCard label="Outbound today" value="18t" change="2 dispatched" positive />
        </div>

        {/* Inventory table */}
        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Current inventory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Zone</th>
                  <th className="px-5 py-3">Expiry</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { product: "Maize", qty: "120t", zone: "A-1", expiry: "Dec 2026", status: "Good" },
                  { product: "Rice", qty: "80t", zone: "A-2", expiry: "Mar 2026", status: "Good" },
                  { product: "Cassava flour", qty: "45t", zone: "B-1", expiry: "Jan 2026", status: "Near expiry" },
                  { product: "Sorghum", qty: "97t", zone: "B-3", expiry: "Jun 2026", status: "Good" },
                ].map((row) => (
                  <tr key={row.product} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-medium text-[--text]">{row.product}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.qty}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.product === "Maize" ? "A-1" : row.zone}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.expiry}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${row.status === "Good" ? "bg-[--success-bg] text-[--success]" : "bg-[--warning-bg] text-[--warning]"}`}>
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
