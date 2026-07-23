import { NextRequest, NextResponse } from "next/server";
import { REGISTRATION_ROLES, type RegistrationRole } from "@/lib/auth/onboarding";
import {
  PENDING_REGISTRATION_COOKIE,
  cookieSecurity,
  generateOtp,
  hashSecret,
  normalizeEmail,
  nowSeconds,
  otpMaxAge,
  randomToken,
  signCookiePayload,
  type PendingRegistrationCookie,
} from "@/lib/auth/session-cookie";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return fail("Invalid registration request.", 400);

  const fullName = String(body.fullName ?? "").trim();
  const email = normalizeEmail(String(body.email ?? ""));
  const phone = String(body.phone ?? "").trim();
  const password = String(body.password ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");
  const role = String(body.role ?? "") as RegistrationRole;
  const acceptedTerms = body.acceptedTerms === true;

  if (fullName.length < 2) return fail("Full name is required.", 400);
  if (!emailPattern.test(email)) return fail("Enter a valid email address.", 400);
  if (!phone) return fail("Phone number is required.", 400);
  if (!REGISTRATION_ROLES.includes(role)) return fail("Select a valid registration role.", 400);
  if (password.length < 8) return fail("Password must be at least 8 characters.", 400);
  if (password !== confirmPassword) return fail("Passwords do not match.", 400);
  if (!acceptedTerms) return fail("You must accept the Terms and Conditions.", 400);

  const now = nowSeconds();
  const otp = generateOtp();
  const passwordSalt = randomToken("pwd");
  const otpSalt = randomToken("otp");
  const pending: PendingRegistrationCookie = {
    id: randomToken("pending"),
    fullName,
    email,
    phone,
    role,
    passwordSalt,
    passwordHash: await hashSecret(password, passwordSalt),
    otpSalt,
    otpHash: await hashSecret(otp, otpSalt),
    attempts: 0,
    maxAttempts: 5,
    createdAt: now,
    expiresAt: now + otpMaxAge(),
    resendAvailableAt: now + 60,
  };

  const res = NextResponse.json({
    ok: true,
    email,
    expiresAt: pending.expiresAt,
    resendAvailableAt: pending.resendAvailableAt,
    message: "Email OTP queued for delivery.",
    ...(process.env.RSCN_SHOW_DEV_OTP === "true" ? { devOtp: otp } : {}),
  });
  res.cookies.set(PENDING_REGISTRATION_COOKIE, await signCookiePayload(pending), { ...cookieSecurity, maxAge: otpMaxAge() });
  return res;
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}
