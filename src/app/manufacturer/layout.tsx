"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function ManufacturerLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="manufacturer">{children}</RoleShell>;
}
