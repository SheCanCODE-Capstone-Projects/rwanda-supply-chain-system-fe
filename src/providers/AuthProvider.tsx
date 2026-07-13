"use client";

import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { User } from "@/types/user";

type AuthContextValue = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      isAuthenticated: Boolean(currentUser),
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
