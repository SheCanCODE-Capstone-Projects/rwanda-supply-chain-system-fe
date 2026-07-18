import { Sidebar } from "@/components/navigation/sidebar";
import { Topbar } from "@/components/navigation/topbar";
import { DashboardLayoutProps } from "./DashboardLayout.types";

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[--surface]">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
