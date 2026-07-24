import Link from "next/link";
import type { ComponentType } from "react";

type SidebarItemData = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

type SidebarItemProps = {
  item: SidebarItemData;
};

export function SidebarItem({ item }: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-green-50"
    >
      <Icon size={20} />
      <span>{item.label}</span>
    </Link>
  );
}
