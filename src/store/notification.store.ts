import type { Notification } from "@/providers/NotificationProvider";

export type NotificationState = {
  notifications: Notification[];
};

export const initialNotificationState: NotificationState = {
  notifications: [],
};
