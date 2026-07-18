import { RoleLayout } from "@/components/layouts/role-layout";
import { StatCard } from "@/components/common/StatCard";
import { UserRole } from "@/constants/roles";

export default function DriverPage() {
  return (
    <RoleLayout role={UserRole.DRIVER}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[--text]">Driver Dashboard</h1>
          <p className="mt-1 text-sm text-[--text-secondary]">
            Your assigned trips, delivery status, and proof of delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Trips today" value="3" change="1 remaining" positive />
          <StatCard label="km driven" value="142" change="This week" positive />
          <StatCard label="On-time rate" value="94%" change="+2% this month" positive />
        </div>

        {/* Today's trips */}
        <div className="rounded-2xl border border-[--border] bg-white shadow-sm">
          <div className="border-b border-[--border] px-5 py-4">
            <h2 className="text-base font-semibold text-[--text]">Today&apos;s trips</h2>
          </div>
          <div className="divide-y divide-[--border]">
            {[
              {
                id: "TRP-001",
                route: "Musanze → Kigali",
                cargo: "Maize · 4 tons",
                pickup: "07:00",
                dropoff: "09:30",
                status: "Completed",
              },
              {
                id: "TRP-002",
                route: "Kigali → Huye",
                cargo: "Fertiliser · 2 tons",
                pickup: "11:00",
                dropoff: "14:00",
                status: "In progress",
              },
              {
                id: "TRP-003",
                route: "Huye → Rusizi",
                cargo: "Coffee · 1.5 tons",
                pickup: "15:30",
                dropoff: "18:00",
                status: "Upcoming",
              },
            ].map((trip) => (
              <div key={trip.id} className="flex items-center justify-between px-5 py-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[--text]">
                    {trip.route}
                    <span className="ml-2 text-xs font-normal text-[--text-secondary]">
                      {trip.id}
                    </span>
                  </p>
                  <p className="text-xs text-[--text-secondary]">
                    {trip.cargo} · {trip.pickup} – {trip.dropoff}
                  </p>
                </div>
                <TripBadge status={trip.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}

function TripBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed: "bg-[--success-bg] text-[--success]",
    "In progress": "bg-[--info-bg] text-[--info]",
    Upcoming: "bg-[--surface] text-[--text-secondary] border border-[--border]",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        styles[status] ?? "bg-[--surface] text-[--text-secondary]"
      }`}
    >
      {status}
    </span>
  );
}
