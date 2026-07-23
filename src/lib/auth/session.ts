"use client";
import { useSyncExternalStore } from "react";
import { ROLE_DASHBOARDS, type RegistrationRole } from "./onboarding";
import { SESSION_COOKIE, signCookiePayload } from "./session-cookie";
import type { Role } from "./roles";

export type SessionClaims = {
  sub: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  org: string;
  iat: number;
  exp: number;
};

export type Session = {
  claims: SessionClaims;
  expiresAt: number;
  emailVerified: boolean;
  profileComplete: boolean;
  profileCompleted: boolean;
  requiresProfileSetup: boolean;
};

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: RegistrationRole;
  acceptedTerms: boolean;
};

export type OtpResponse = {
  ok: boolean;
  email: string;
  expiresAt: number;
  resendAvailableAt: number;
  message: string;
  devOtp?: string;
};

export type AuthResult = {
  ok: boolean;
  session: Session;
  nextPath: string;
};

const listeners = new Set<() => void>();
let current: Session | null = null;
let initialized = false;

const emit = () => listeners.forEach((listener) => listener());
const shouldUseDevAuthFallback = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ENABLE_FAKE_OTP === "true";

export async function initSession() {
  if (initialized) return current;
  initialized = true;
  return loadSession();
}

export function getSession(): Session | null {
  return current;
}

export function useSession(): Session | null {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => null,
  );
}

export async function loadSession(): Promise<Session | null> {
  const restored = readPersistedSession();
  if (restored) {
    current = restored;
    emit();
    console.log("Authenticated User:", restored);
    console.log("Profile Completed:", restored.profileCompleted);
  }

  try {
    const data = await requestJson<{ ok: boolean; session: Session | null }> ("/api/auth/session");
    const serverSession = data.session ?? restored;
    if (serverSession) {
      current = serverSession;
      persistSession(serverSession);
      emit();
      console.log("Authenticated User:", serverSession);
      console.log("Profile Completed:", serverSession.profileCompleted);
    } else {
      clearPersistedSession();
      current = null;
      emit();
    }
  } catch (error) {
    console.error("Session restore failed", error);
  }

  return current;
}

export async function signInWithCredentials(input: LoginInput): Promise<AuthResult> {
  console.log("Current Route:", typeof window !== "undefined" ? window.location.pathname : "server");
  if (shouldUseDevAuthFallback) {
    const mockResult = createFakeLoginResult(input);
    current = mockResult.session;
    persistSession(mockResult.session);
    emit();
    return mockResult;
  }

  const result = await postJson<AuthResult>("/api/auth/login", input);
  current = result.session;
  persistSession(result.session);
  emit();
  return result;
}

export async function registerAccount(input: RegisterInput): Promise<OtpResponse> {
  const response = await postJson<OtpResponse>("/api/auth/register", input);
  persistDevRegistrationState(input.email, input.role);
  return response;
}

export async function verifyEmailOtp(otp: string): Promise<AuthResult> {
  console.log("Current Route:", typeof window !== "undefined" ? window.location.pathname : "server");
  if (shouldUseDevAuthFallback) {
    const mockResult = createFakeOtpResult(otp);
    current = mockResult.session;
    persistSession(mockResult.session);
    emit();
    return mockResult;
  }

  const result = await postJson<AuthResult>("/api/auth/verify-email-otp", { otp });
  current = result.session;
  persistSession(result.session);
  emit();
  return result;
}

export async function resendEmailOtp(): Promise<OtpResponse & { retryAfter?: number }> {
  return postJson<OtpResponse & { retryAfter?: number }>("/api/auth/resend-otp", {});
}

export async function completeProfileSetup(input: Record<string, unknown>): Promise<AuthResult> {  if (shouldUseDevAuthFallback) {
    if (!current) throw new Error("Please sign in before completing profile setup.");
    const completedSession = {
      ...current,
      profileComplete: true,
      profileCompleted: true,
      requiresProfileSetup: false,
    };
    persistDevProfileCompletion(current.claims.email, current.claims.role, true);
    persistSession(completedSession);
    current = completedSession;
    emit();
    return {
      ok: true,
      session: completedSession,
      nextPath: ROLE_DASHBOARDS[current.claims.role],
    };
  }
  const result = await postJson<AuthResult>("/api/auth/profile-setup", input);
  const completedSession = {
    ...result.session,
    profileComplete: true,
    profileCompleted: true,
    requiresProfileSetup: false,
  };
  persistDevProfileCompletion(result.session.claims.email, result.session.claims.role, true);
  persistSession(completedSession);
  current = completedSession;
  emit();
  return { ...result, session: completedSession };
}

export async function refreshSession(): Promise<Session | null> {
  const data = await postJson<{ ok: boolean; session: Session | null }>("/api/auth/refresh", {});
  current = data.session;  if (current) persistSession(current);
  else clearPersistedSession();  emit();
  return current;
}

export async function beginGoogleAuth(input: { intent: "login" | "register"; role?: RegistrationRole }) {
  return postJson<{ ok: boolean; authUrl?: string }>("/api/auth/google", input);
}

export function signOut() {
  current = null;
  clearPersistedSession();
  emit();
  void fetch("/api/auth/logout", { method: "POST", credentials: "include" });
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseResponse<T>(res);
}

async function requestJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "include" });
  return parseResponse<T>(res);
}

async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error ?? "Authentication request failed.");
  }
  return data as T;
}

function createFakeOtpResult(otp: string): AuthResult {
  const isValidOtp = otp.length === 6 && /^\d{6}$/.test(otp);
  if (!isValidOtp) {
    throw new Error("Enter a valid 6-digit OTP.");
  }

  const registration = readDevRegistrationState();
  const role = registration?.role ?? "buyer";
  const profileCompleted = role === "buyer";

  const fakeSession: Session = {
    claims: {
      sub: "dev-user",
      name: "Development User",
      email: registration?.email ?? "developer@rscn.local",
      phone: "+250700000000",
      role,
      org: "RSCN",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    emailVerified: true,
    profileComplete: profileCompleted,
    profileCompleted,
    requiresProfileSetup: !profileCompleted,
  };

  return {
    ok: true,
    session: fakeSession,
    nextPath: fakeSession.requiresProfileSetup ? "/auth/profile-setup" : ROLE_DASHBOARDS[role],
  };
}

function createFakeLoginResult(input: LoginInput): AuthResult {
  const roleMap: Record<string, Role> = {
    admin: "super_admin",
    farmer: "farmer",
    cooperative: "cooperative",
    manufacturer: "manufacturer",
    supplier: "supplier",
    buyer: "buyer",
    retailer: "retailer",
    warehouse: "warehouse",
    transport: "transport",
    driver: "driver",
    bank: "bank",
    government: "government",
  };

  const normalizedEmail = input.email.trim().toLowerCase();
  const role = normalizedEmail.split("@")[0] as keyof typeof roleMap;
  const resolvedRole = roleMap[role] ?? "buyer";
  const storedCompletion = readDevProfileCompletion(normalizedEmail);
  const profileCompleted = storedCompletion !== null ? storedCompletion : true;

  const fakeSession: Session = {
    claims: {
      sub: `dev-${resolvedRole}`,
      name: `${resolvedRole.charAt(0).toUpperCase()}${resolvedRole.slice(1)} Demo`,
      email: normalizedEmail,
      phone: "+250700000000",
      role: resolvedRole,
      org: "RSCN",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    emailVerified: true,
    profileComplete: profileCompleted,
    profileCompleted,
    requiresProfileSetup: resolvedRole !== "buyer" && !profileCompleted,
  };

  const nextPath = fakeSession.requiresProfileSetup ? "/auth/profile-setup" : ROLE_DASHBOARDS[resolvedRole];

  return {
    ok: true,
    session: fakeSession,
    nextPath,
  };
}

function persistDevRegistrationState(email: string, role: RegistrationRole) {
  if (typeof window === "undefined") return;
  const normalizedEmail = email.trim().toLowerCase();
  const state = readDevProfileState();
  state[normalizedEmail] = { role, profileCompleted: false };
  window.localStorage.setItem("rscn.dev-profile-state", JSON.stringify(state));
}

async function persistSession(session: Session) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("rscn.auth-session", JSON.stringify(session));

  const cookiePayload = {
    claims: session.claims,
    expiresAt: session.expiresAt,
    emailVerified: session.emailVerified,
    profileComplete: session.profileComplete,
    profileCompleted: session.profileCompleted,
    refreshVersion: 1,
    remember: true,
  };
  const signed = await signCookiePayload(cookiePayload);
  document.cookie = `${SESSION_COOKIE}=${signed}; path=/; max-age=2592000; SameSite=Lax`;
}

function readPersistedSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem("rscn.auth-session");
    if (!value) return null;
    const parsed = JSON.parse(value) as Session;
    if (!parsed?.claims?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

function clearPersistedSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("rscn.auth-session");
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

function persistDevProfileCompletion(email: string, role: Role, profileCompleted: boolean) {
  if (typeof window === "undefined") return;
  const normalizedEmail = email.trim().toLowerCase();
  const current = readDevProfileState();
  current[normalizedEmail] = { role, profileCompleted };
  window.localStorage.setItem("rscn.dev-profile-state", JSON.stringify(current));
}

function readDevProfileCompletion(email: string): boolean | null {
  const state = readDevProfileState();
  const normalizedEmail = email.trim().toLowerCase();
  return state[normalizedEmail]?.profileCompleted ?? null;
}

function readDevRegistrationState(): { email: string; role: Role } | null {
  if (typeof window === "undefined") return null;
  try {
    const state = readDevProfileState();
    const entry = Object.entries(state).find(([, item]) => item.role && typeof item.profileCompleted === "boolean");
    if (!entry) return null;
    const [email, item] = entry;
    return { email, role: item.role as Role };
  } catch {
    return null;
  }
}

function readDevProfileState(): Record<string, { role: Role; profileCompleted: boolean }> {
  if (typeof window === "undefined") return {};
  try {
    const value = window.localStorage.getItem("rscn.dev-profile-state");
    if (!value) return {};
    const parsed = JSON.parse(value) as Record<string, { role?: Role; profileCompleted?: boolean }>;
    return Object.fromEntries(Object.entries(parsed).filter(([, item]) => item?.role && typeof item.profileCompleted === "boolean").map(([email, item]) => [email, { role: item.role as Role, profileCompleted: item.profileCompleted as boolean }]));
  } catch {
    return {};
  }
}
