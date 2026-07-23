import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, readSignedCookie, toPublicSession, type AuthSessionCookie } from "@/lib/auth/session-cookie";

export async function GET(req: NextRequest) {
  const session = await readSignedCookie<AuthSessionCookie>(req.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ ok: true, session: null });
  const now = Math.floor(Date.now() / 1000);
  if (session.expiresAt <= now) return NextResponse.json({ ok: true, session: null });
  return NextResponse.json({ ok: true, session: toPublicSession(session) });
}
