"use client";
import { createContext, useContext, type ReactNode } from "react";
import { commsStore, useComms, notifForRole, threadForRole } from "@/lib/comms-store";
import type { Notification, Thread } from "@/lib/comms-store";
import type { Role } from "@/lib/auth/roles";

type NotificationContextValue = {
  notifications: Notification[];
  threads: Thread[];
  unreadCount: (role?: Role) => number;
  unreadMessages: (role?: Role) => number;
  markRead: (id: string) => void;
  markAllRead: (role?: Role) => void;
  markThreadRead: (id: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  notificationsForRole: (role?: Role) => Notification[];
  threadsForRole: (role?: Role) => Thread[];
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notifications = useComms((s) => s.notifications);
  const threads = useComms((s) => s.threads);

  const value: NotificationContextValue = {
    notifications,
    threads,
    unreadCount: (role?: Role) =>
      notifications.filter((n) => !n.read && notifForRole(n, role)).length,
    unreadMessages: (role?: Role) =>
      threads.filter((t) => threadForRole(t, role)).reduce((sum, t) => sum + t.unread, 0),
    markRead: commsStore.markRead,
    markAllRead: commsStore.markAllRead,
    markThreadRead: commsStore.markThreadRead,
    sendMessage: commsStore.sendMessage,
    notificationsForRole: (role?: Role) =>
      notifications.filter((n) => notifForRole(n, role)),
    threadsForRole: (role?: Role) =>
      threads.filter((t) => threadForRole(t, role)),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used inside <NotificationProvider>");
  return ctx;
}
