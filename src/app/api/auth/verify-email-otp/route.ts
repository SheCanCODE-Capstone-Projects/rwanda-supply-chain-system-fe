import { NextRequest, NextResponse } from "next/server";
import { ROLE_DASHBOARDS, requiresProfileSetupForRole } from "@/lib/auth/onboarding";
import {
  ACCOUNT_COOKIE,
  PENDING_REGISTRATION_COOKIE,
  SESSION_COOKIE,
  accountMaxAge,
  cookieSecurity,
  createSessionFromAccount,
  hashSecret,
  nowSeconds,
  readSignedCookie,
  signCookiePayload,
  sessionMaxAge,
  toPublicSession,
  type AccountCookie,
  type PendingRegistrationCookie,
} from "@/lib/auth/session-cookie";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  const otp = String(body?.otp ?? "").replace(/\D/g, "");
  if (otp.length !== 6) return fail("Enter the 6-digit email OTP.", 400);

  const pending = await readSignedCookie<PendingRegistrationCookie>(req.cookies.get(PENDING_REGISTRATION_COOKIE)?.value);
  if (!pending) return fail("No pending registration was found. Please register again.", 404);

  const now = nowSeconds();
  if (pending.expiresAt <= now) return fail("This OTP has expired. Please request a new code.", 410);
  if (pending.attempts >= pending.maxAttempts) return fail("Too many OTP attempts. Please request a new code.", 429);

  const valid = await hashSecret(otp, pending.otpSalt) === pending.otpHash;
  if (!valid) {
    const nextPending = { ...pending, attempts: pending.attempts + 1 };
    const res = fail(`Invalid OTP. ${Math.max(0, pending.maxAttempts - nextPending.attempts)} attempts remaining.`, 400);
    res.cookies.set(PENDING_REGISTRATION_COOKIE, await signCookiePayload(nextPending), { ...cookieSecurity, maxAge: Math.max(1, pending.expiresAt - now) });
    return res;
  }

  const account: AccountCookie = {
    sub: pending.id.replace("pending", "user"),
    fullName: pending.fullName,
    email: pending.email,
    phone: pending.phone,
    role: pending.role,
    passwordSalt: pending.passwordSalt,
    passwordHash: pending.passwordHash,
    emailVerified: true,
    profileComplete: pending.role === "buyer",
    createdAt: pending.createdAt,
    updatedAt: now,
  };
  const session = createSessionFromAccount(account, false);
  const profileCompleted = session.profileCompleted ?? session.profileComplete;
  const nextPath = requiresProfileSetupForRole(session.claims.role, profileCompleted) ? "/auth/profile-setup" : ROLE_DASHBOARDS[session.claims.role];

  const res = NextResponse.json({ ok: true, session: toPublicSession(session), nextPath });
  res.cookies.set(ACCOUNT_COOKIE, await signCookiePayload(account), { ...cookieSecurity, maxAge: accountMaxAge() });
  res.cookies.set(SESSION_COOKIE, await signCookiePayload(session), { ...cookieSecurity, maxAge: sessionMaxAge(false) });
  res.cookies.set(PENDING_REGISTRATION_COOKIE, "", { ...cookieSecurity, maxAge: 0 });
  return res;
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}
