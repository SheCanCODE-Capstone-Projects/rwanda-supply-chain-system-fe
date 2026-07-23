import type { UserRole } from "@/constants/roles";
import type { ID } from "@/types/common";

export type User = {
  id: ID;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: ID;
  createdAt?: string;
  updatedAt?: string;
};
