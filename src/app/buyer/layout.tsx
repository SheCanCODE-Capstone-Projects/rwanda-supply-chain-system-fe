"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="buyer">{children}</RoleShell>;
}
