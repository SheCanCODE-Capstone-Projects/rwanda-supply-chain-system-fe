/**
 * Auth token helpers.
 *
 * The token is stored in BOTH localStorage (for client-side reads) and a
 * same-site cookie (so Next.js middleware can check auth status on the Edge
 * without accessing localStorage, which is not available there).
 *
 * The cookie is HttpOnly=false intentionally — it is NOT a security boundary,
 * it exists solely as a presence indicator for the middleware redirect logic.
 * The real token is always read from localStorage / Authorization header.
 */

const TOKEN_KEY = "rscn.accessToken";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// --------------------------------------------------------------------------
// Cookie helpers (client-side only)
// --------------------------------------------------------------------------

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

// --------------------------------------------------------------------------
// Public API
// --------------------------------------------------------------------------

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function storeToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  setCookie(TOKEN_KEY, token, COOKIE_MAX_AGE);
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  deleteCookie(TOKEN_KEY);
}
