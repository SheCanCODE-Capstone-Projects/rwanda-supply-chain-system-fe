import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function TransportPage() {
  return (
    <RoleLayout role={UserRole.TRANSPORT}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Transporter Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Manage your fleet, active jobs, and delivery performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Active trips" value="6" change="+1 today" positive />
          <StatCard label="Completed today" value="3" change="On track" positive />
          <StatCard label="Fleet utilisation" value="78%" change="+5% vs last week" positive />
          <StatCard label="Revenue (RWF)" value="840K" change="+12% this month" positive />
        </div>

        {/* Active trips */}
        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Active trips</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Driver</th>
                  <th className="px-5 py-3">Route</th>
                  <th className="px-5 py-3">Cargo</th>
                  <th className="px-5 py-3">ETA</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { driver: "Jean P.", route: "Musanze → Kigali", cargo: "Maize 12t", eta: "2h 30m", status: "On route" },
                  { driver: "Alice M.", route: "Huye → Rusizi", cargo: "Coffee 8t", eta: "4h 10m", status: "On route" },
                  { driver: "Eric N.", route: "Kigali → Nyagatare", cargo: "Fertilizer", eta: "3h 00m", status: "Loading" },
                ].map((row) => (
                  <tr key={row.driver} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-medium text-[--text]">{row.driver}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.route}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.cargo}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.eta}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${row.status === "On route" ? "bg-[--info-bg] text-[--info]" : "bg-[--warning-bg] text-[--warning]"}`}>
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
