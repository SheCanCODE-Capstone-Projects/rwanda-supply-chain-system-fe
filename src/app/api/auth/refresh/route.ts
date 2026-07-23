import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  cookieSecurity,
  readSignedCookie,
  sessionMaxAge,
  signCookiePayload,
  toPublicSession,
  type AuthSessionCookie,
} from "@/lib/auth/session-cookie";

export async function POST(req: NextRequest) {
  const session = await readSignedCookie<AuthSessionCookie>(req.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ ok: true, session: null });

  const now = Math.floor(Date.now() / 1000);
  if (session.expiresAt <= now) {
    const res = NextResponse.json({ ok: true, session: null });
    res.cookies.set(SESSION_COOKIE, "", { ...cookieSecurity, maxAge: 0 });
    return res;
  }

  const expiresAt = now + sessionMaxAge(session.remember);
  const rotated: AuthSessionCookie = {
    ...session,
    refreshVersion: session.refreshVersion + 1,
    expiresAt,
    claims: { ...session.claims, iat: now, exp: expiresAt },
  };
  const res = NextResponse.json({ ok: true, session: toPublicSession(rotated) });
  res.cookies.set(SESSION_COOKIE, await signCookiePayload(rotated), { ...cookieSecurity, maxAge: sessionMaxAge(rotated.remember) });
  return res;
}
