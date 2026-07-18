import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function CooperativePage() {
  return (
    <RoleLayout role={UserRole.COOPERATIVE}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Cooperative Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Coordinate members, manage pooled inventory, and oversee distributions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Members" value="142" change="+8 this quarter" positive />
          <StatCard label="Pooled stock (tons)" value="86" change="+12 this week" positive />
          <StatCard label="Active orders" value="14" positive />
          <StatCard label="Distributed (RWF)" value="6.8M" change="+18% this month" positive />
        </div>

        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Member contributions this week</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Member</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Quality</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { member: "Jean Habimana", product: "Maize", qty: "3.2t", quality: "Grade A", status: "Accepted" },
                  { member: "Alice Mukamana", product: "Beans", qty: "1.8t", quality: "Grade B", status: "Accepted" },
                  { member: "Pierre Niyonzima", product: "Sorghum", qty: "2.0t", quality: "Grade A", status: "Pending" },
                  { member: "Marie Uwimana", product: "Maize", qty: "1.5t", quality: "Grade A", status: "Accepted" },
                ].map((row) => (
                  <tr key={row.member} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-medium text-[--text]">{row.member}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.product}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.qty}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.quality}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        row.status === "Accepted" ? "bg-[--success-bg] text-[--success]" : "bg-[--warning-bg] text-[--warning]"
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
