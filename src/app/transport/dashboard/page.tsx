import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function TransportDashboardPage() {
  return <RoleHome role="transport" spec={ROLE_HOME_SPEC.transport} />;
}
