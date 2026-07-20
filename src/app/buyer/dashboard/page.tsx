import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function BuyerDashboardPage() {
  return <RoleHome role="buyer" spec={ROLE_HOME_SPEC.buyer} />;
}
