import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function BankPage() {
  return (
    <RoleLayout role={UserRole.BANK}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Bank Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Review financing applications, monitor settlements, and track partner performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active loans" value="84" change="+6 this month" positive />
          <StatCard label="Portfolio (RWF)" value="2.4B" change="+12% YoY" positive />
          <StatCard label="Pending reviews" value="12" change="Needs action" positive={false} />
          <StatCard label="Repayment rate" value="97.2%" change="+0.4% this quarter" positive />
        </div>

        {/* Recent transactions */}
        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Recent transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Reference</th>
                  <th className="px-5 py-3">Business</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Amount (RWF)</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { ref: "TXN-8821", business: "Musanze Coop", type: "Loan disbursement", amount: "15,000,000", status: "Settled" },
                  { ref: "TXN-8820", business: "Kigali Logistics", type: "Repayment", amount: "2,400,000", status: "Settled" },
                  { ref: "TXN-8819", business: "Huye Farmers Ltd", type: "Loan application", amount: "8,000,000", status: "Under review" },
                  { ref: "TXN-8818", business: "East Africa Oils", type: "Repayment", amount: "5,100,000", status: "Pending" },
                ].map((row) => (
                  <tr key={row.ref} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-mono text-xs text-[--text-secondary]">{row.ref}</td>
                    <td className="px-5 py-3 font-medium text-[--text]">{row.business}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.type}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.amount}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        row.status === "Settled" ? "bg-[--success-bg] text-[--success]"
                        : row.status === "Under review" ? "bg-[--warning-bg] text-[--warning]"
                        : "bg-[--surface] text-[--text-secondary] border border-[--border]"
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
