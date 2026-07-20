"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="farmer">{children}</RoleShell>;
}
