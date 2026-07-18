import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// --------------------------------------------------------------------------
// Route categories
// --------------------------------------------------------------------------

/** Auth routes that should redirect AWAY if the user IS already authenticated */
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-otp",
  "/verify-email",
];

/** Routes that require authentication (dashboard roots) */
const PROTECTED_ROUTE_PREFIXES = [
  "/admin",
  "/government",
  "/farmer",
  "/cooperative",
  "/manufacturer",
  "/supplier",
  "/buyer",
  "/retailer",
  "/warehouse",
  "/transport",
  "/driver",
  "/bank",
  "/complete-profile",
];

// The localStorage key used by AuthProvider / lib/auth.ts
const TOKEN_STORAGE_KEY = "rscn.accessToken";
const USER_STORAGE_KEY = "rscn.user";

// --------------------------------------------------------------------------
// Middleware
// --------------------------------------------------------------------------

/**
 * Next.js middleware runs on the Edge — it cannot read localStorage.
 * We rely on a short-lived cookie (`rscn.token`) that the client sets in
 * parallel with localStorage (see `lib/auth.ts`).  If the cookie is absent
 * we treat the user as unauthenticated.
 *
 * Cookie is set/cleared by the browser-side auth helpers, NOT by the server.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read auth cookie (mirrors localStorage token set by the client)
  const token = request.cookies.get(TOKEN_STORAGE_KEY)?.value ?? null;
  const isAuthenticated = Boolean(token);

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  // 1. Already authenticated → don't show auth pages again
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Not authenticated → block protected routes
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    const nextPath = request.nextUrl.search
      ? `${pathname}${request.nextUrl.search}`
      : pathname;
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all routes EXCEPT:
   *  - _next/static / _next/image  (Next.js internals)
   *  - favicon.ico / public assets
   *  - API routes
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
