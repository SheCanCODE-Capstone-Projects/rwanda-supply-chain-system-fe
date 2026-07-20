import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function ManufacturerDashboardPage() {
  return <RoleHome role="manufacturer" spec={ROLE_HOME_SPEC.manufacturer} />;
}
