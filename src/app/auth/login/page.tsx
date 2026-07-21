"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthShell, Field, inputCls, primaryBtn } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { ALL_ROLES, ROLE_META, Role, roleDashboard } from "@/lib/auth/roles";
import { signInAs } from "@/lib/auth/session";
import { useT } from "@/lib/i18n";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const [role, setRole] = useState<Role>("farmer");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const t = useT();

  async function handleSignIn(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true); setErr(null);
    try {
      await signInAs(role);
      router.push(redirect ?? roleDashboard(role));
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : t("auth.login.error"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title={t("auth.login.title")}
      description={t("auth.login.description")}
      footer={<> {t("auth.login.footer.prompt")} <Link href="/auth/register" className="font-medium text-primary hover:underline">{t("auth.login.footer.link")}</Link></>}
    >
      <div className="space-y-4">
        <GoogleButton to="/auth/choose-role" />
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>{t("auth.login.or")}</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <form className="space-y-4" onSubmit={handleSignIn}>
          <Field label={t("auth.login.email")}>
            <input type="text" defaultValue={`${role}@rscn.rw`} className={inputCls} autoComplete="username" />
          </Field>
          <Field label={t("auth.login.password")}>
            <input type="password" placeholder="••••••••" defaultValue="demo-password" className={inputCls} autoComplete="current-password" />
          </Field>

          <Field label={t("auth.login.demo")}>
            <div className="grid grid-cols-3 gap-1.5">
              {ALL_ROLES.map((r) => {
                const meta = ROLE_META[r];
                const Icon = meta.icon;
                const active = r === role;
                return (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-left text-xs transition ${
                      active
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border bg-background hover:bg-surface"
                    }`}
                    title={meta.label}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{meta.short}</span>
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="rounded border-border" /> {t("auth.login.remember")}
            </label>
            <Link href="/auth/forgot-password" className="font-medium text-primary hover:underline">{t("auth.login.forgot")}</Link>
          </div>
          {err && <p className="text-xs text-danger">{err}</p>}
          <button type="submit" disabled={busy} className={`${primaryBtn} disabled:opacity-60`}>
            {busy ? t("auth.login.signingIn") : `${t("auth.login.button")} ${ROLE_META[role].short}`}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
