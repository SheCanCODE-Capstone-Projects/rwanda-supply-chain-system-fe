import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function SupplierPage() {
  return (
    <RoleLayout role={UserRole.SUPPLIER}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Supplier Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Manage your catalogue, respond to RFQs, and track order fulfilment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active products" value="38" change="+5 this month" positive />
          <StatCard label="Open RFQs" value="4" change="Respond before Fri" positive={false} />
          <StatCard label="Orders to fulfill" value="9" positive />
          <StatCard label="Revenue (RWF)" value="4.1M" change="+11% this month" positive />
        </div>

        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Incoming orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Buyer</th>
                  <th className="px-5 py-3">Qty</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { id: "SO-2210", product: "Fertiliser NPK", buyer: "Musanze Coop", qty: "500 bags", status: "Packing" },
                  { id: "SO-2209", product: "Seed maize", buyer: "Kirehe Farmers", qty: "200 kg", status: "Dispatched" },
                  { id: "SO-2208", product: "Pesticide 1L", buyer: "Huye Agro", qty: "150 units", status: "Delivered" },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-mono text-xs text-[--text-secondary]">{row.id}</td>
                    <td className="px-5 py-3 font-medium text-[--text]">{row.product}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.buyer}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.qty}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        row.status === "Delivered" ? "bg-[--success-bg] text-[--success]"
                        : row.status === "Dispatched" ? "bg-[--info-bg] text-[--info]"
                        : "bg-[--warning-bg] text-[--warning]"
                      }`}>{row.status}</span>
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
