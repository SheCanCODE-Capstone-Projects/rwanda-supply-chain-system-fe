import { NextRequest, NextResponse } from "next/server";
import { ROLE_DASHBOARDS, requiresProfileSetupForRole } from "@/lib/auth/onboarding";
import { SESSION_COOKIE, readSignedCookie, type AuthSessionCookie } from "@/lib/auth/session-cookie";

const ROLE_PREFIXES: Record<string, string> = {
  "/admin": "super_admin",
  "/government": "government",
  "/farmer": "farmer",
  "/cooperative": "cooperative",
  "/manufacturer": "manufacturer",
  "/supplier": "supplier",
  "/buyer": "buyer",
  "/retailer": "retailer",
  "/warehouse": "warehouse",
  "/transport": "transport",
  "/driver": "driver",
  "/bank": "bank",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await readSignedCookie<AuthSessionCookie>(req.cookies.get(SESSION_COOKIE)?.value);
  const profileCompleted = session?.profileCompleted ?? session?.profileComplete ?? false;

  if (pathname === "/auth/profile-setup") {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    if (profileCompleted) {
      const url = req.nextUrl.clone();
      url.pathname = ROLE_DASHBOARDS[session.claims.role] ?? "/buyer/dashboard";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  const prefix = Object.keys(ROLE_PREFIXES).find((item) => pathname.startsWith(item));
  if (!prefix) return NextResponse.next();

  const requiredRole = ROLE_PREFIXES[prefix];
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (session.claims.role !== requiredRole) {
    const url = req.nextUrl.clone();
    url.pathname = "/forbidden";
    url.searchParams.set("from", pathname);
    url.searchParams.set("required", requiredRole);
    return NextResponse.redirect(url);
  }

  if (requiresProfileSetupForRole(session.claims.role, profileCompleted)) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/profile-setup";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/government/:path*",
    "/farmer/:path*",
    "/cooperative/:path*",
    "/manufacturer/:path*",
    "/supplier/:path*",
    "/buyer/:path*",
    "/retailer/:path*",
    "/warehouse/:path*",
    "/transport/:path*",
    "/driver/:path*",
    "/bank/:path*",
    "/auth/profile-setup",
  ],
};
