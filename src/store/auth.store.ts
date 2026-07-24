import type { AuthSession } from "@/types/auth";

export type AuthState = {
  session: AuthSession | null;
};

export const initialAuthState: AuthState = {
  session: null,
};
