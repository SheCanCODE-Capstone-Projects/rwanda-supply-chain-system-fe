"use client";
import { use } from "react";
import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";
import { RoleModulePage } from "@/components/app/shells/RoleModulePage";

export default function SupplierSlugPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = use(params);
  const path = slug?.join("/") ?? "";
  if (!path) return <RoleHome role="supplier" spec={ROLE_HOME_SPEC.supplier} />;
  return <RoleModulePage role="supplier" slug={path} />;
}
