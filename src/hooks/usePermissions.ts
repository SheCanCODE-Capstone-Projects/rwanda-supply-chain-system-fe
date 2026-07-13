"use client";

import type { Permission } from "@/constants/permissions";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/lib/permissions";

export function usePermissions() {
  const { currentUser } = useAuth();

  return {
    can(permission: Permission) {
      return hasPermission(currentUser?.role, permission);
    },
  };
}
