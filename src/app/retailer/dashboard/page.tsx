"use client";
import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";

export default function RetailerDashboardPage() {
  return <RoleHome role="retailer" spec={ROLE_HOME_SPEC.retailer} />;
}
