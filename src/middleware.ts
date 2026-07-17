import { NextRequest, NextResponse } from "next/server";

const ROLE_PREFIXES: Record<string, string> = {
  "/admin":        "super_admin",
  "/government":   "government",
  "/farmer":       "farmer",
  "/cooperative":  "cooperative",
  "/manufacturer": "manufacturer",
  "/supplier":     "supplier",
  "/buyer":        "buyer",
  "/retailer":     "retailer",
  "/warehouse":    "warehouse",
  "/transport":    "transport",
  "/driver":       "driver",
  "/bank":         "bank",
};

const ROLE_HOME: Record<string, string> = {
  super_admin:  "/admin/dashboard",
  government:   "/government/dashboard",
  farmer:       "/farmer/dashboard",
  cooperative:  "/cooperative/dashboard",
  manufacturer: "/manufacturer/dashboard",
  supplier:     "/supplier/dashboard",
  buyer:        "/buyer/dashboard",
  retailer:     "/retailer/dashboard",
  warehouse:    "/warehouse/dashboard",
  transport:    "/transport/dashboard",
  driver:       "/driver/dashboard",
  bank:         "/bank/dashboard",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Determine which role prefix this path belongs to
  const prefix = Object.keys(ROLE_PREFIXES).find((p) => pathname.startsWith(p));
  if (!prefix) return NextResponse.next();

  const requiredRole = ROLE_PREFIXES[prefix];

  // Read session from cookie (set by login)
  const sessionRaw = req.cookies.get("rscn.session")?.value;

  if (!sessionRaw) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  try {
    const session = JSON.parse(sessionRaw);
    const userRole = session?.claims?.role;

    if (userRole !== requiredRole) {
      const url = req.nextUrl.clone();
      url.pathname = "/forbidden";
      url.searchParams.set("from", pathname);
      url.searchParams.set("required", requiredRole);
      return NextResponse.redirect(url);
    }
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
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
  ],
};
