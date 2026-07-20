"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function GovernmentLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="government">{children}</RoleShell>;
}
