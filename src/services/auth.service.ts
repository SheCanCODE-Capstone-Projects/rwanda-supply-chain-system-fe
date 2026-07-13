import { apiFetch } from "@/services/api";
import type {
  AuthSession,
  LoginCredentials,
  RegisterPayload,
} from "@/types/auth";

export const authService = {
  login(credentials: LoginCredentials) {
    return apiFetch<AuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  register(payload: RegisterPayload) {
    return apiFetch<AuthSession>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  logout() {
    return apiFetch<void>("/auth/logout", { method: "POST" });
  },
};
