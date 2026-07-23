"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AuthShell, primaryBtn, secondaryBtn } from "@/components/auth/AuthShell";
import { resendEmailOtp, verifyEmailOtp } from "@/lib/auth/session";
import { ROLE_DASHBOARDS } from "@/lib/auth/onboarding";
import { useT } from "@/lib/i18n";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your email address";
  const t = useT();
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [cooldown, setCooldown] = useState(60);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const code = useMemo(() => digits.join(""), [digits]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function setDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setDigits((current) => current.map((item, i) => (i === index ? digit : item)));
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  }

  function paste(value: string) {
    const pasted = value.replace(/\D/g, "").slice(0, 6).split("");
    if (pasted.length === 0) return;
    setDigits(Array.from({ length: 6 }, (_, index) => pasted[index] ?? ""));
    inputs.current[Math.min(pasted.length, 6) - 1]?.focus();
  }

  async function verify() {
    setBusy(true);
    setErr(null);
    setNotice(null);
    try {
      const result = await verifyEmailOtp(code);
      setNotice(t("auth.otp.success"));
      const target = result.session.claims.role === "buyer" || result.session.claims.role === "super_admin" ? ROLE_DASHBOARDS[result.session.claims.role] : "/auth/profile-setup";
      router.push(target);
    } catch (error) {
      setErr(error instanceof Error ? error.message : t("auth.otp.error"));
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setBusy(true);
    setErr(null);
    setNotice(null);
    try {
      await resendEmailOtp();
      setCooldown(60);
      setNotice(t("auth.otp.resent"));
    } catch (error) {
      setErr(error instanceof Error ? error.message : t("auth.otp.resendError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell title={t("auth.otp.title")} description={`${t("auth.otp.description")} ${email}.`}>
      <div className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
        We send the one-time password to your email only. The code expires after 10 minutes and can be resent once the countdown finishes.
      </div>
      <div className="flex justify-between gap-2" onPaste={(event) => { event.preventDefault(); paste(event.clipboardData.getData("text")); }}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(node) => { inputs.current[i] = node; }}
            value={digit}
            maxLength={1}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : undefined}
            onChange={(event) => setDigit(i, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
            }}
            className="h-14 w-full max-w-[52px] rounded-lg border border-border bg-background text-center text-lg font-semibold outline-none focus:ring-2 focus:ring-ring"
            aria-label={`OTP digit ${i + 1}`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{cooldown > 0 ? `Code expires in ${Math.max(1, Math.ceil(cooldown / 60))}m` : "Code expired? Request a new one."}</span>
        <button type="button" disabled={cooldown > 0 || busy} onClick={resend} className="font-medium text-primary hover:underline disabled:text-muted-foreground disabled:no-underline">
          {cooldown > 0 ? `${t("auth.otp.resendIn")} ${cooldown}s` : t("auth.otp.resend")}
        </button>
      </div>
      {err && <p className="mt-4 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-xs text-danger">{err}</p>}
      {notice && <p className="mt-4 rounded-lg border border-success/20 bg-success/5 px-3 py-2 text-xs text-success">{notice}</p>}
      <div className="mt-6 space-y-2">
        <button type="button" onClick={verify} disabled={busy || code.length !== 6} className={primaryBtn}>{busy ? t("auth.otp.verifying") : t("auth.otp.verify")}</button>
        <Link href="/auth/register" className={secondaryBtn}>{t("form.back")}</Link>
      </div>
    </AuthShell>
  );
}
