"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavigation } from "@/config/dashboard-navigation";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./SidebarItems";

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const items = dashboardNavigation[role as keyof typeof dashboardNavigation] ?? [];

  return (
    <aside
      className="hidden lg:flex w-[var(--sidebar-width)] flex-col border-r border-[--border] bg-[--sidebar-bg] py-5"
      aria-label="Sidebar navigation"
    >
      {/* Brand */}
      <div className="mb-6 flex items-center gap-2.5 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[--primary]">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" />
          </svg>
        </span>
        <span className="text-sm font-bold text-[--sidebar-text]">RSCN</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {items.map((item) => (
          <SidebarItem key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>
    </aside>
  );
}
