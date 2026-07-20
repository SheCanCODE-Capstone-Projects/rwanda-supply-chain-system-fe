"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function BankLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="bank">{children}</RoleShell>;
}
