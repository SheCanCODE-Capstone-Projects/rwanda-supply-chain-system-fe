"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="super_admin">{children}</RoleShell>;
}
