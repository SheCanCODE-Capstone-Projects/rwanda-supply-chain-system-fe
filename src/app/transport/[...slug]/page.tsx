"use client";
import { use } from "react";
import { RoleHome } from "@/components/app/shells/RoleHome";
import { ROLE_HOME_SPEC } from "@/components/app/shells/roleHomeSpecs";
import { RoleModulePage } from "@/components/app/shells/RoleModulePage";

export default function TransportSlugPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug?.join("/") ?? "";
  if (!slug) return <RoleHome role="transport" spec={ROLE_HOME_SPEC.transport} />;
  return <RoleModulePage role="transport" slug={slug} />;
}
