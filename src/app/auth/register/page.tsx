"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthShell, Field, inputCls, primaryBtn } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { PasswordStrength, scorePassword } from "@/components/auth/PasswordStrength";
import { useT } from "@/lib/i18n";

export default function RegisterPage() {
  const [pw, setPw] = useState("");
  const t = useT();
  const steps = [t("auth.register.steps.account"), t("auth.register.steps.business"), t("auth.register.steps.verify"), t("auth.register.steps.done")];
  const strong = scorePassword(pw) >= 3;
  return (
    <AuthShell
      title={t("auth.register.title")}
      description={t("auth.register.description")}
      footer={<> {t("auth.register.footer.prompt")} <Link href="/auth/login" className="font-medium text-primary hover:underline">{t("auth.register.footer.link")}</Link></>}
    >
      <ol className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2 text-xs">
            <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"}`}>{i + 1}</span>
            <span className={i === 0 ? "font-medium" : "text-muted-foreground"}>{s}</span>
            {i < steps.length - 1 && <span className="mx-1 h-px w-4 bg-border" />}
          </li>
        ))}
      </ol>

      <div className="space-y-4">
        <GoogleButton to="/auth/choose-role" />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>{t("auth.register.or")}</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("auth.register.firstName")}><input className={inputCls} /></Field>
            <Field label={t("auth.register.lastName")}><input className={inputCls} /></Field>
          </div>
          <Field label={t("auth.register.email")}><input type="email" className={inputCls} placeholder="you@company.rw" /></Field>
          <Field label={t("auth.register.phone")}><input className={inputCls} placeholder="+250 78..." /></Field>
          <div>
            <Field label={t("auth.register.password")}>
              <input
                type="password"
                className={inputCls}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                autoComplete="new-password"
              />
            </Field>
            <PasswordStrength value={pw} />
          </div>
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" className="mt-0.5 rounded border-border" />
            {t("auth.register.terms")} <Link href="/auth/terms" className="text-primary hover:underline">{t("auth.register.termsLink")}</Link> {t("auth.register.privacy")}
          </label>
          <Link
            href="/auth/verify-otp"
            className={`${primaryBtn} ${!strong ? "pointer-events-none opacity-60" : ""}`}
            aria-disabled={!strong}
          >
            {t("auth.register.continue")}
          </Link>
        </form>
      </div>
    </AuthShell>
  );
}
