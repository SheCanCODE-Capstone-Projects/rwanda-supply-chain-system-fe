"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="driver">{children}</RoleShell>;
}
