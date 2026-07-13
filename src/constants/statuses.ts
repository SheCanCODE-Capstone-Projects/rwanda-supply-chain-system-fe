export const STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  SUSPENDED: "suspended",
  DRAFT: "draft",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type Status = (typeof STATUSES)[keyof typeof STATUSES];
