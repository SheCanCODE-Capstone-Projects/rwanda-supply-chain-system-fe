"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function CooperativeLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="cooperative">{children}</RoleShell>;
}
