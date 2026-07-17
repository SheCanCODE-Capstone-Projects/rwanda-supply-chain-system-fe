"use client";
import { useSyncExternalStore } from "react";
import { Role, ROLE_META } from "./roles";

export type SessionClaims = {
  sub: string; name: string; email: string;
  role: Role; org: string; iat: number; exp: number;
};
export type Session = {
  accessToken: string;
  refreshToken: string;
  claims: SessionClaims;
  expiresAt: number;
  refreshExpiresAt: number;
};

const DEMO_NAMES: Record<Role, string> = {
  super_admin: "Alice Uwase", government: "Eric Habimana", farmer: "Jean Mugisha",
  cooperative: "Claudine Ingabire", manufacturer: "Patrick Nkusi", supplier: "Diane Umuhoza",
  buyer: "Kevin Rwema", retailer: "Sandrine Iradukunda", warehouse: "David Bizimana",
  transport: "Olivier Nshimiyimana", driver: "Emmanuel Niyonkuru", bank: "Grace Mukamana",
};

const SESSION_KEY = "rscn.session.v1";
const COOKIE_NAME = "rscn.session";
let current: Session | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function getCookieValue(name: string): string | null {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookieValue(name: string, value: string, maxAge: number) {
  if (typeof window === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

function persistSession(session: Session | null) {
  if (typeof window === "undefined") return;
  const payload = session ? JSON.stringify(session) : null;
  if (payload) {
    window.sessionStorage.setItem(SESSION_KEY, payload);
  } else {
    window.sessionStorage.removeItem(SESSION_KEY);
  }
  setCookieValue(COOKIE_NAME, payload ?? "", session ? 60 * 60 * 24 * 7 : 0);
}

function readStoredSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(SESSION_KEY) ?? getCookieValue(COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.claims && parsed.accessToken && parsed.refreshToken) return parsed as Session;
  } catch {
    return null;
  }
  return null;
}

export function initSession() {
  if (typeof window === "undefined") return;
  current = readStoredSession();
  const now = Math.floor(Date.now() / 1000);
  if (current && current.expiresAt <= now + 60) {
    current = null;
    persistSession(null);
  }
  emit();
}

export function getSession(): Session | null { return current; }

export function useSession(): Session | null {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => current,
    () => null,
  );
}

export async function signInAs(role: Role): Promise<Session | null> {
  const name = DEMO_NAMES[role];
  const email = `${role}@rscn.demo`;
  const now = Math.floor(Date.now() / 1000);
  const claims: SessionClaims = {
    sub: `demo-${role}`, name, email, role,
    org: ROLE_META[role].orgType, iat: now, exp: now + 86400,
  };
  current = {
    accessToken: `demo-access-${role}-${now}`,
    refreshToken: `demo-refresh-${role}-${now + 1}`,
    claims,
    expiresAt: now + 86400,
    refreshExpiresAt: now + 604800,
  };
  persistSession(current);
  emit();
  return current;
}

export async function refreshSession(): Promise<Session | null> {
  if (!current) return null;
  const now = Math.floor(Date.now() / 1000);
  if (current.expiresAt > now + 60) return current;
  if (current.refreshExpiresAt <= now) {
    signOut();
    return null;
  }
  const rotated = {
    ...current,
    accessToken: `demo-access-${current.claims.role}-${now}`,
    refreshToken: `demo-refresh-${current.claims.role}-${now + 2}`,
    claims: { ...current.claims, iat: now, exp: now + 86400 },
    expiresAt: now + 86400,
    refreshExpiresAt: now + 604800,
  };
  current = rotated;
  persistSession(current);
  emit();
  return current;
}

export function signOut() {
  current = null;
  persistSession(null);
  emit();
}
