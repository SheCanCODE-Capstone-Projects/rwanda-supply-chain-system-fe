import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function BankDashboardPage() {
  return <RoleHome role="bank" spec={ROLE_HOME_SPEC.bank} />;
}
