"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";
export default function TransportLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="transport">{children}</RoleShell>;
}
