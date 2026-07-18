"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import type { UserRole } from "@/constants/roles";

const ROLE_DASHBOARD: Record<UserRole, string> = {
  ADMIN: ROUTES.ADMIN,
  GOVERNMENT: ROUTES.GOVERNMENT,
  FARMER: ROUTES.FARMER,
  COOPERATIVE: ROUTES.COOPERATIVE,
  MANUFACTURER: ROUTES.MANUFACTURER,
  SUPPLIER: ROUTES.SUPPLIER,
  BUYER: ROUTES.BUYER,
  RETAILER: ROUTES.RETAILER,
  WAREHOUSE: ROUTES.WAREHOUSE,
  TRANSPORT: ROUTES.TRANSPORT,
  DRIVER: ROUTES.DRIVER,
  BANK: ROUTES.BANK,
};

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { setSession } = useAuth();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Tick down resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  // Auto-submit once all 6 digits are filled
  useEffect(() => {
    if (digits.every((d) => d.length === 1)) {
      void handleVerify(digits.join(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  function handleDigitChange(index: number, value: string) {
    // Accept paste of full OTP
    if (value.length === OTP_LENGTH && /^\d{6}$/.test(value)) {
      setDigits(value.split(""));
      inputRefs.current[OTP_LENGTH - 1]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleVerify(otp: string) {
    if (!email) {
      setApiError("Missing email. Please go back and try again.");
      return;
    }
    setApiError(null);
    setLoading(true);
    try {
      const session = await authService.verifyOtp(email, otp);
      setSession(session.user, session.accessToken);
      router.push(ROLE_DASHBOARD[session.user.role] ?? ROUTES.HOME);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Invalid or expired OTP. Please try again.",
      );
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email || cooldown > 0) return;
    setApiError(null);
    setResending(true);
    try {
      await authService.resendOtp(email);
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Failed to resend code. Try again.",
      );
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="animate-fade-in-scale space-y-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--primary)">
          Verification
        </p>
        <h1 className="text-2xl font-semibold text-(--text)">Enter your code</h1>
        <p className="text-sm text-(--text-secondary)">
          We sent a 6-digit code to{" "}
          {email ? (
            <span className="font-medium text-(--text)">{email}</span>
          ) : (
            "your email"
          )}
          . It expires in 10 minutes.
        </p>
      </div>

      {/* OTP input boxes */}
      <div
        className="flex items-center justify-center gap-3"
        role="group"
        aria-label="One-time password"
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={OTP_LENGTH}
            value={digit}
            onChange={(e) => handleDigitChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-label={`Digit ${i + 1}`}
            disabled={loading}
            className="h-14 w-12 rounded-xl border-2 border-(--border) bg-white text-center text-xl font-semibold text-(--text) transition-colors focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/20 disabled:opacity-50"
          />
        ))}
      </div>

      {apiError && (
        <div
          role="alert"
          className="rounded-xl border border-(--danger) bg-(--danger-bg) px-4 py-3 text-sm text-(--danger)"
        >
          {apiError}
        </div>
      )}

      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full"
        loading={loading}
        disabled={digits.some((d) => !d) || loading}
        onClick={() => handleVerify(digits.join(""))}
      >
        Verify
      </Button>

      <p className="text-center text-sm text-(--text-secondary)">
        Didn&apos;t receive a code?{" "}
        {cooldown > 0 ? (
          <span className="text-(--text-muted)">Resend in {cooldown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="font-medium text-(--primary) hover:underline disabled:opacity-50"
          >
            {resending ? "Sending…" : "Resend code"}
          </button>
        )}
      </p>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense>
      <VerifyOtpContent />
    </Suspense>
  );
}
