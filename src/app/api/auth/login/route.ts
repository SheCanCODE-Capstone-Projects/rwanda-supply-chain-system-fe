import { NextRequest, NextResponse } from "next/server";
import { ROLE_DASHBOARDS, requiresProfileSetupForRole } from "@/lib/auth/onboarding";
import {
  ACCOUNT_COOKIE,
  SESSION_COOKIE,
  cookieSecurity,
  createSessionFromAccount,
  hashSecret,
  normalizeEmail,
  readSignedCookie,
  sessionMaxAge,
  signCookiePayload,
  toPublicSession,
  type AccountCookie,
} from "@/lib/auth/session-cookie";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  const email = normalizeEmail(String(body?.email ?? ""));
  const password = String(body?.password ?? "");
  const remember = body?.remember === true;
  if (!email || !password) return fail("Email and password are required.", 400);

  const account = await readSignedCookie<AccountCookie>(req.cookies.get(ACCOUNT_COOKIE)?.value);
  if (!account || account.email !== email) {
    return fail("We could not find a verified RSCN account for this email in the connected auth store.", 401);
  }
  const passwordHash = await hashSecret(password, account.passwordSalt);
  if (passwordHash !== account.passwordHash) return fail("Invalid email or password.", 401);
  if (!account.emailVerified) return fail("Please verify your email before logging in.", 403);

  const session = createSessionFromAccount(account, remember);
  const profileCompleted = session.profileCompleted ?? session.profileComplete;
  const nextPath = requiresProfileSetupForRole(session.claims.role, profileCompleted) ? "/auth/profile-setup" : ROLE_DASHBOARDS[session.claims.role];
  const res = NextResponse.json({ ok: true, session: toPublicSession(session), nextPath });
  res.cookies.set(SESSION_COOKIE, await signCookiePayload(session), { ...cookieSecurity, maxAge: sessionMaxAge(remember) });
  return res;
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}
