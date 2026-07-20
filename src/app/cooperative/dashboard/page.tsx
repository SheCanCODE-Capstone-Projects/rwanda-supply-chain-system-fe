import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function CooperativeDashboardPage() {
  return <RoleHome role="cooperative" spec={ROLE_HOME_SPEC.cooperative} />;
}
