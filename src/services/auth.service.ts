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
  forgotPassword(email: string) {
    return apiFetch<void>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
  resetPassword(token: string, password: string) {
    return apiFetch<void>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  },
  verifyOtp(email: string, otp: string) {
    return apiFetch<AuthSession>("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  },
  resendOtp(email: string) {
    return apiFetch<void>("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
  verifyEmail(token: string) {
    return apiFetch<void>(`/auth/verify-email?token=${encodeURIComponent(token)}`, {
      method: "GET",
    });
  },
};
