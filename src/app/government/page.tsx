import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function GovernmentPage() {
  return (
    <RoleLayout role={UserRole.GOVERNMENT}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Government Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            National supply chain oversight, food security metrics, and compliance reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Businesses on platform" value="12,480" change="+240 this month" positive />
          <StatCard label="Tons moved (Q3)" value="1.2M" change="+8.4% YoY" positive />
          <StatCard label="Districts covered" value="48 / 30" positive />
          <StatCard label="Compliance rate" value="91%" change="+3% this quarter" positive />
        </div>

        {/* National overview table */}
        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Supply activity by province</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Province</th>
                  <th className="px-5 py-3">Businesses</th>
                  <th className="px-5 py-3">Tons moved</th>
                  <th className="px-5 py-3">Compliance</th>
                  <th className="px-5 py-3">Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { province: "Kigali City", businesses: "3,240", tons: "320K", compliance: "96%", alert: "None" },
                  { province: "Northern", businesses: "2,180", tons: "280K", compliance: "89%", alert: "None" },
                  { province: "Southern", businesses: "2,640", tons: "260K", compliance: "87%", alert: "Low stock" },
                  { province: "Eastern", businesses: "2,420", tons: "220K", compliance: "92%", alert: "None" },
                  { province: "Western", businesses: "2,000", tons: "140K", compliance: "84%", alert: "Low stock" },
                ].map((row) => (
                  <tr key={row.province} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-medium text-[--text]">{row.province}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.businesses}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.tons}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.compliance}</td>
                    <td className="px-5 py-3">
                      {row.alert === "None" ? (
                        <span className="text-xs text-[--text-muted]">—</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-[--warning-bg] px-2.5 py-0.5 text-xs font-semibold text-[--warning]">
                          {row.alert}
                        </span>
                      )}
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
