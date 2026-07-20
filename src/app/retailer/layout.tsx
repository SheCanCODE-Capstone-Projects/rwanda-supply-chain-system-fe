"use client";
import { RoleShell } from "@/components/app/shells/RoleShell";

export default function RetailerLayout({ children }: { children: React.ReactNode }) {
  return <RoleShell role="retailer">{children}</RoleShell>;
}
