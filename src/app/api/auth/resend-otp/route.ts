import { NextRequest, NextResponse } from "next/server";
import {
  PENDING_REGISTRATION_COOKIE,
  cookieSecurity,
  generateOtp,
  hashSecret,
  nowSeconds,
  otpMaxAge,
  randomToken,
  readSignedCookie,
  signCookiePayload,
  type PendingRegistrationCookie,
} from "@/lib/auth/session-cookie";

export async function POST(req: NextRequest) {
  const pending = await readSignedCookie<PendingRegistrationCookie>(req.cookies.get(PENDING_REGISTRATION_COOKIE)?.value);
  if (!pending) return fail("No pending registration was found. Please register again.", 404);

  const now = nowSeconds();
  if (pending.resendAvailableAt > now) {
    return NextResponse.json({ ok: false, error: "Please wait before requesting another OTP.", retryAfter: pending.resendAvailableAt - now }, { status: 429 });
  }

  const otp = generateOtp();
  const otpSalt = randomToken("otp");
  const nextPending: PendingRegistrationCookie = {
    ...pending,
    otpSalt,
    otpHash: await hashSecret(otp, otpSalt),
    attempts: 0,
    expiresAt: now + otpMaxAge(),
    resendAvailableAt: now + 60,
  };

  const res = NextResponse.json({
    ok: true,
    email: nextPending.email,
    expiresAt: nextPending.expiresAt,
    resendAvailableAt: nextPending.resendAvailableAt,
    message: "A new email OTP was queued for delivery.",
    ...(process.env.RSCN_SHOW_DEV_OTP === "true" ? { devOtp: otp } : {}),
  });
  res.cookies.set(PENDING_REGISTRATION_COOKIE, await signCookiePayload(nextPending), { ...cookieSecurity, maxAge: otpMaxAge() });
  return res;
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}
