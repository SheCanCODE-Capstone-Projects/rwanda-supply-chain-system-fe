import { requiresProfileSetupForRole } from "./onboarding";
import type { Role } from "./roles";

export const SESSION_COOKIE = "rscn.session";
export const ACCOUNT_COOKIE = "rscn.account";
export const PENDING_REGISTRATION_COOKIE = "rscn.pending_registration";

const SESSION_MAX_AGE = 60 * 60 * 24;
const REMEMBERED_SESSION_MAX_AGE = 60 * 60 * 24 * 30;
const ACCOUNT_MAX_AGE = 60 * 60 * 24 * 365;
const OTP_MAX_AGE = 60 * 10;

export const cookieSecurity = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export type AuthSessionClaims = {
  sub: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  org: string;
  iat: number;
  exp: number;
};

export type AuthSessionCookie = {
  claims: AuthSessionClaims;
  expiresAt: number;
  emailVerified: boolean;
  profileComplete: boolean;
  profileCompleted: boolean;
  refreshVersion: number;
  remember: boolean;
};

export type PublicSession = Omit<AuthSessionCookie, "refreshVersion" | "remember"> & {
  profileCompleted: boolean;
  requiresProfileSetup: boolean;
};

export type AccountCookie = {
  sub: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  passwordSalt: string;
  passwordHash: string;
  emailVerified: boolean;
  profileComplete: boolean;
  profile?: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
};

export type PendingRegistrationCookie = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  passwordSalt: string;
  passwordHash: string;
  otpSalt: string;
  otpHash: string;
  attempts: number;
  maxAttempts: number;
  createdAt: number;
  expiresAt: number;
  resendAvailableAt: number;
};

export function sessionMaxAge(remember: boolean) {
  return remember ? REMEMBERED_SESSION_MAX_AGE : SESSION_MAX_AGE;
}

export function accountMaxAge() {
  return ACCOUNT_MAX_AGE;
}

export function otpMaxAge() {
  return OTP_MAX_AGE;
}

export function toPublicSession(session: AuthSessionCookie): PublicSession {
  const profileCompleted = session.profileCompleted ?? session.profileComplete;
  return {
    claims: session.claims,
    expiresAt: session.expiresAt,
    emailVerified: session.emailVerified,
    profileComplete: profileCompleted,
    profileCompleted,
    requiresProfileSetup: requiresProfileSetupForRole(session.claims.role, profileCompleted),
  };
}

export function createSessionFromAccount(account: AccountCookie, remember: boolean): AuthSessionCookie {
  const now = nowSeconds();
  const expiresAt = now + sessionMaxAge(remember);

  const profileCompleted = account.role === "buyer" || account.role === "super_admin" ? true : account.profileComplete;

  return {
    claims: {
      sub: account.sub,
      name: account.fullName,
      email: account.email,
      phone: account.phone,
      role: account.role,
      org:
        (account.profile?.organizationName as string | undefined) ??
        (account.profile?.businessName as string | undefined) ??
        (account.profile?.companyName as string | undefined) ??
        (account.profile?.institutionName as string | undefined) ??
        "RSCN",
      iat: now,
      exp: expiresAt,
    },
    expiresAt,
    emailVerified: account.emailVerified,
    profileComplete: profileCompleted,
    profileCompleted,
    refreshVersion: 1,
    remember,
  };
}

export async function signCookiePayload<T>(payload: T): Promise<string> {
  const json = JSON.stringify(payload);
  const body = base64UrlEncode(textEncoder.encode(json));
  const signature = await hmac(body);
  return `${body}.${signature}`;
}

export async function readSignedCookie<T>(value?: string | null): Promise<T | null> {
  if (!value) return null;
  const [body, signature] = value.split(".");
  if (!body || !signature) return null;
  const expected = await hmac(body);
  if (!timingSafeEqual(signature, expected)) return null;

  try {
    const bytes = base64UrlDecode(body);
    return JSON.parse(textDecoder.decode(bytes)) as T;
  } catch {
    return null;
  }
}

export async function hashSecret(value: string, salt: string): Promise<string> {
  return hmac(`${salt}:${value}`);
}

export function randomToken(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`;
}

export function generateOtp() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return String(bytes[0] % 1_000_000).padStart(6, "0");
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

async function hmac(value: string): Promise<string> {
  const secret = process.env.AUTH_SESSION_SECRET ?? "rscn-development-secret-change-before-production";
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let i = 0; i < left.length; i += 1) {
    result |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return result === 0;
}
