"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { initSession, useSession, type Session } from "@/lib/auth/session";

type AuthContextValue = {
  session: Session | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  useEffect(() => {
    initSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, isAuthenticated: session !== null }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
