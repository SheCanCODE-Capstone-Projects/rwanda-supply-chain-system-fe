import { RoleLayoutProps } from "./RoleLayout.types";
import { DashboardLayout } from "../dashboard-layout";

export function RoleLayout({ children, role }: RoleLayoutProps) {
  return (
    <DashboardLayout role={role}>
      {children}
    </DashboardLayout>
  );
}
