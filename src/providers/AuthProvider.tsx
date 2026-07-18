"use client";

import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import type { User } from "@/types/user";
import { storeToken, clearStoredToken, getStoredToken } from "@/lib/auth";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";

type AuthContextValue = {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Called after a successful login/register to persist session */
  setSession: (user: User, token: string) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

const USER_STORAGE_KEY = "rscn.user";

function loadStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with stored values so there's no flash on refresh
  const [currentUser, setCurrentUser] = useState<User | null>(loadStoredUser);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: if we have a token but no user (or just validate state), mark loading done
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      // No token → clear any stale user
      setCurrentUser(null);
    }
    setIsLoading(false);
  }, []);

  const setSession = useCallback((user: User, token: string) => {
    storeToken(token);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setCurrentUser(user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore server errors — still clear local state
    } finally {
      clearStoredToken();
      window.localStorage.removeItem(USER_STORAGE_KEY);
      setCurrentUser(null);
      // Hard redirect to login
      window.location.href = ROUTES.LOGIN;
    }
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      isLoading,
      setSession,
      logout,
    }),
    [currentUser, isLoading, setSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
