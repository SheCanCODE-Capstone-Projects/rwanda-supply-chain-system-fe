import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function FarmerDashboardPage() {
  return <RoleHome role="farmer" spec={ROLE_HOME_SPEC.farmer} />;
}
