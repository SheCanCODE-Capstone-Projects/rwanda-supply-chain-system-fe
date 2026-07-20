"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="supplier">{children}</RoleShell>;
}
