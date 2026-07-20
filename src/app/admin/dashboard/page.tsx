import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function AdminDashboardPage() {
  return <RoleHome role="super_admin" spec={ROLE_HOME_SPEC.super_admin} />;
}
