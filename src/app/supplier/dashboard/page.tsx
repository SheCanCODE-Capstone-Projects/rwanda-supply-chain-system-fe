"use client";
import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function SupplierDashboardPage() {
  return <RoleHome role="supplier" spec={ROLE_HOME_SPEC.supplier} />;
}
