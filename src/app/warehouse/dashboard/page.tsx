import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function WarehouseDashboardPage() {
  return <RoleHome role="warehouse" spec={ROLE_HOME_SPEC.warehouse} />;
}
