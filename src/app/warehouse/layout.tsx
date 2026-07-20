"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function WarehouseLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="warehouse">{children}</RoleShell>;
}
