import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function AdminPage() {
  return (
    <RoleLayout role={UserRole.ADMIN}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Platform overview — users, activity, and system health.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total users" value="12,480" change="+240 this month" positive />
          <StatCard label="Active today" value="1,042" change="+18% vs yesterday" positive />
          <StatCard label="Pending approvals" value="34" change="Needs attention" positive={false} />
          <StatCard label="Platform uptime" value="99.9%" positive />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent registrations */}
          <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
            <div className="border-b border-[--border] px-5 py-4">
              <h2 className="text-base font-semibold text-[--text]">Recent registrations</h2>
            </div>
            <div className="divide-y divide-[--border]">
              {[
                { name: "Kigali Fresh Ltd", role: "Retailer", date: "Today, 09:14", status: "Pending" },
                { name: "Musanze Transport Co.", role: "Transport", date: "Today, 08:41", status: "Approved" },
                { name: "Nyagatare Coop", role: "Cooperative", date: "Yesterday", status: "Approved" },
                { name: "BK Agri Finance", role: "Bank", date: "Yesterday", status: "Pending" },
                { name: "Rwanda Maize Millers", role: "Manufacturer", date: "2 days ago", status: "Approved" },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-[--text]">{item.name}</p>
                    <p className="text-xs text-[--text-secondary]">{item.role} · {item.date}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    item.status === "Approved"
                      ? "bg-[--success-bg] text-[--success]"
                      : "bg-[--warning-bg] text-[--warning]"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Users by role */}
          <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
            <div className="border-b border-[--border] px-5 py-4">
              <h2 className="text-base font-semibold text-[--text]">Users by role</h2>
            </div>
            <div className="divide-y divide-[--border]">
              {[
                { role: "Farmer / Producer", count: "4,820", pct: 39 },
                { role: "Retailer", count: "2,640", pct: 21 },
                { role: "Transporter", count: "1,980", pct: 16 },
                { role: "Cooperative", count: "1,240", pct: 10 },
                { role: "Manufacturer", count: "880", pct: 7 },
                { role: "Other", count: "920", pct: 7 },
              ].map((item) => (
                <div key={item.role} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[--text] truncate">{item.role}</span>
                      <span className="ml-2 shrink-0 text-[--text-secondary]">{item.count}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-[--surface]">
                      <div
                        className="h-1.5 rounded-full bg-[--primary]"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
