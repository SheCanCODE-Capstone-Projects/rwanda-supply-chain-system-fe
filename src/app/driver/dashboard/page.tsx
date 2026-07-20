import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function DriverDashboardPage() {
  return <RoleHome role="driver" spec={ROLE_HOME_SPEC.driver} />;
}
