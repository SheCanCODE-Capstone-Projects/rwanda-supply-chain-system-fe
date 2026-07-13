"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Notification = {
  id: string;
  title: string;
  message?: string;
  tone?: "success" | "warning" | "danger" | "neutral";
};

type NotificationContextValue = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
};

export const NotificationContext = createContext<
  NotificationContextValue | undefined
>(undefined);

type NotificationProviderProps = {
  children: ReactNode;
};

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      setNotifications((current) => [
        ...current,
        { ...notification, id: crypto.randomUUID() },
      ]);
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  }, []);

  const value = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [addNotification, notifications, removeNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
