"use client";
import type { ComponentType, SVGProps } from "react";
import {
  Banknote,
  Factory,
  Landmark,
  Package,
  Shield,
  ShoppingCart,
  Sprout,
  Store,
  Truck,
  User as UserIcon,
  Users,
  Warehouse,
} from "lucide-react";
import type { Role } from "@/lib/auth/roles";
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
export const ROLE_ICONS: Record<Role, IconComponent> = {
  super_admin: Shield,
  government: Landmark,
  farmer: Sprout,
  cooperative: Users,
  manufacturer: Factory,
  supplier: Package,
  buyer: ShoppingCart,
  retailer: Store,
  warehouse: Warehouse,
  transport: Truck,
  driver: UserIcon,
  bank: Banknote,
};
export function getRoleIcon(role: Role): IconComponent {
  return ROLE_ICONS[role];
}
export function RoleIcon({ role, className }: { role: Role; className?: string }) {
  const Icon = ROLE_ICONS[role];
  return <Icon aria-hidden="true" className={className} />;
}
