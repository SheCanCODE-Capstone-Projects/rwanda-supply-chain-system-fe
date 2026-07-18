import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function ManufacturerPage() {
  return (
    <RoleLayout role={UserRole.MANUFACTURER}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Manufacturer Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Monitor production, raw material sourcing, and outbound orders.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Production runs" value="5" change="Active today" positive />
          <StatCard label="Raw materials (tons)" value="210" change="-18 this week" positive={false} />
          <StatCard label="Finished goods" value="94t" change="+22 today" positive />
          <StatCard label="Output value (RWF)" value="12.4M" change="+9% this month" positive />
        </div>

        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Active production orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[--border] bg-[--surface] text-left text-xs font-semibold uppercase tracking-wide text-[--text-secondary]">
                  <th className="px-5 py-3">Batch</th>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Input</th>
                  <th className="px-5 py-3">Output target</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { batch: "B-0421", product: "Maize flour (1kg)", input: "12t maize", output: "10t flour", status: "In progress" },
                  { batch: "B-0420", product: "Rice (500g)", input: "8t paddy", output: "6t rice", status: "Quality check" },
                  { batch: "B-0419", product: "Cooking oil (5L)", input: "4t sunflower", output: "3,800 L", status: "Completed" },
                ].map((row) => (
                  <tr key={row.batch} className="hover:bg-[--surface]">
                    <td className="px-5 py-3 font-mono text-xs text-[--text-secondary]">{row.batch}</td>
                    <td className="px-5 py-3 font-medium text-[--text]">{row.product}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.input}</td>
                    <td className="px-5 py-3 text-[--text-secondary]">{row.output}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        row.status === "Completed" ? "bg-[--success-bg] text-[--success]"
                        : row.status === "In progress" ? "bg-[--info-bg] text-[--info]"
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
