import { ROLE_PERMISSIONS } from "@/config/permissions";
import type { Permission } from "@/constants/permissions";
import type { UserRole } from "@/constants/roles";

export function hasPermission(role: UserRole | undefined, permission: Permission) {
  if (!role) {
    return false;
  }

  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
