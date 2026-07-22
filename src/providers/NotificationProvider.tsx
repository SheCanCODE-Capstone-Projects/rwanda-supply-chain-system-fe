"use client";

import { createContext, useContext, type ReactNode } from "react";
import { commsStore, useComms, type Notification, type Thread } from "@/lib/comms-store";
import type { Role } from "@/lib/auth/roles";

type NotificationContextValue = {
  notifications: Notification[];
  threads: Thread[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: (role?: Role) => void;
  markThreadRead: (id: string) => void;
  sendMessage: (threadId: string, text: string) => void;
};

const NotificationContext = createContext<NotificationContextValue>({
  notifications: [],
  threads: [],
  unreadCount: 0,
  markRead: () => {},
  markAllRead: () => {},
  markThreadRead: () => {},
  sendMessage: () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notifications = useComms((s) => s.notifications);
  const threads = useComms((s) => s.threads);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        threads,
        unreadCount,
        markRead: commsStore.markRead,
        markAllRead: commsStore.markAllRead,
        markThreadRead: commsStore.markThreadRead,
        sendMessage: commsStore.sendMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextValue {
  return useContext(NotificationContext);
}
