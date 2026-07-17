import { Role } from "./roles";

export type Permission =
  | "platform:manage" | "users:manage" | "roles:manage" | "audit:view" | "settings:manage"
  | "national:view" | "policy:manage" | "reports:national"
  | "products:view" | "products:write"
  | "orders:view" | "orders:write"
  | "marketplace:browse" | "marketplace:sell"
  | "inventory:view" | "inventory:write"
  | "procurement:view" | "procurement:write"
  | "rfq:view" | "rfq:respond"
  | "warehouse:view" | "warehouse:manage" | "warehouse:dispatch"
  | "fleet:view" | "fleet:manage" | "driver:app"
  | "payments:view" | "payments:manage" | "loans:view" | "loans:approve"
  | "members:manage" | "suppliers:manage" | "contracts:manage"
  | "analytics:view" | "reports:view" | "notifications:view" | "messages:view";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: ["platform:manage","users:manage","roles:manage","audit:view","settings:manage","analytics:view","reports:view","notifications:view","messages:view"],
  government:  ["national:view","policy:manage","reports:national","warehouse:view","fleet:view","analytics:view","reports:view","notifications:view","settings:manage"],
  farmer:      ["products:view","products:write","inventory:view","inventory:write","orders:view","marketplace:sell","warehouse:view","fleet:view","payments:view","notifications:view","messages:view"],
  cooperative: ["members:manage","products:view","products:write","inventory:view","inventory:write","orders:view","orders:write","warehouse:view","reports:view","payments:view","notifications:view","messages:view"],
  manufacturer:["products:view","products:write","procurement:view","procurement:write","suppliers:manage","inventory:view","inventory:write","orders:view","orders:write","warehouse:view","fleet:view","analytics:view","payments:view","notifications:view","messages:view"],
  supplier:    ["products:view","products:write","rfq:view","rfq:respond","orders:view","orders:write","contracts:manage","payments:view","notifications:view","messages:view"],
  buyer:       ["marketplace:browse","orders:view","orders:write","payments:view","notifications:view","messages:view"],
  retailer:    ["inventory:view","inventory:write","orders:view","orders:write","suppliers:manage","analytics:view","payments:view","notifications:view","messages:view"],
  warehouse:   ["warehouse:view","warehouse:manage","warehouse:dispatch","inventory:view","inventory:write","reports:view","notifications:view","messages:view"],
  transport:   ["fleet:view","fleet:manage","orders:view","reports:view","payments:view","notifications:view","messages:view"],
  driver:      ["driver:app","orders:view","notifications:view","messages:view"],
  bank:        ["loans:view","loans:approve","analytics:view","reports:view","notifications:view","messages:view"],
};

export function hasPermission(role: Role | undefined, perm: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(perm);
}
