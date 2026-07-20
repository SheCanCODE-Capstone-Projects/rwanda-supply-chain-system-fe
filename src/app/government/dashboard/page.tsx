import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function GovernmentDashboardPage() {
  return <RoleHome role="government" spec={ROLE_HOME_SPEC.government} />;
}
