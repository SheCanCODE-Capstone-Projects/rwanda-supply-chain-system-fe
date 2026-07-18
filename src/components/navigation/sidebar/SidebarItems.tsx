import Link from "next/link";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

type SidebarItemData = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

type SidebarItemProps = {
  item: SidebarItemData;
  active: boolean;
};

export function SidebarItem({ item, active }: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-[--sidebar-active-bg] text-[--primary]"
          : "text-[--sidebar-muted] hover:bg-white/5 hover:text-[--sidebar-text]",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon
        size={18}
        strokeWidth={active ? 2.2 : 1.8}
        className={active ? "text-[--primary]" : "text-[--sidebar-muted]"}
      />
      {item.label}
    </Link>
  );
}
