import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// ─── Auth & Roles ─────────────────────────────────────────────────────────────
export type Role =
  | "super_admin" | "government" | "farmer" | "cooperative" | "manufacturer"
  | "supplier" | "buyer" | "retailer" | "warehouse" | "transport" | "driver" | "bank";

export type User = {
  id: string; name: string; email: string; phone?: string;
  role: Role; org: string; avatar?: string; verified: boolean; createdAt: string;
};

// ─── Business Entities ────────────────────────────────────────────────────────
export type Company = {
  id: string; name: string; type: string; district: string;
  contact: string; email: string; status: EntityStatus;
};

export type Product = {
  id: string; name: string; sku: string; category: string;
  quantity: number; unit: string; price: number; status: EntityStatus;
};

export type Order = {
  id: string; ref: string; buyer: string; seller: string;
  items: number; total: number; status: OrderStatus; createdAt: string;
};

export type Inventory = {
  id: string; product: string; warehouse: string;
  quantity: number; unit: string; expiresAt?: string; status: EntityStatus;
};

export type Warehouse = {
  id: string; name: string; district: string; capacity: number;
  used: number; manager: string; status: EntityStatus;
};

export type Driver = {
  id: string; name: string; phone: string; vehicle: string;
  plate: string; trips: number; status: DriverStatus;
};

export type Notification = {
  id: string; message: string; category: string;
  tone: Tone; time: string; read: boolean; targetRoles?: Role[];
};

export type Message = { self: boolean; text: string; time: string };
export type Thread = {
  id: string; name: string; role: string;
  time: string; unread: number; messages: Message[];
};

// ─── UI / Shared ──────────────────────────────────────────────────────────────
export type Tone = "success" | "warning" | "danger" | "info" | "muted";
export type EntityStatus = "Active" | "Inactive" | "Pending" | "Suspended";
export type OrderStatus = "Pending" | "Confirmed" | "In Transit" | "Delivered" | "Cancelled";
export type DriverStatus = "Available" | "On Trip" | "Off Duty";

export type NavItem = { slug: string; label: string; icon: IconComponent; perm?: string };
export type QuickAction = { label: string; slug: string; icon: IconComponent };

export type SelectOption = { value: string; label: string };

export type TableColumn<T = Record<string, unknown>> = {
  key: keyof T & string;
  label: string;
  badge?: (v: unknown) => Tone | null;
  render?: (v: unknown, row: T) => React.ReactNode;
};

export type PaginationState = { page: number; pageSize: number; total: number };

export type ModalState = { open: boolean; data?: unknown };
