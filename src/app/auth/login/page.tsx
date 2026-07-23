"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthShell, Field, inputCls, primaryBtn } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { beginGoogleAuth, signInWithCredentials } from "@/lib/auth/session";
import { ROLE_DASHBOARDS } from "@/lib/auth/onboarding";
import { useT } from "@/lib/i18n";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const t = useT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const result = await signInWithCredentials({ email, password, remember });
      const target = redirect && redirect !== "/auth/profile-setup" ? redirect : ROLE_DASHBOARDS[result.session.claims.role];
      router.push(target);
    } catch (error) {
      setErr(error instanceof Error ? error.message : t("auth.login.error"));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setErr(null);
    try {
      const result = await beginGoogleAuth({ intent: "login" });
      if (result.authUrl) window.location.href = result.authUrl;
    } catch (error) {
      setErr(error instanceof Error ? error.message : t("auth.google.notConfigured"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title={t("auth.login.title")}
      description={t("auth.login.description")}
      footer={<>{t("auth.login.footer.prompt")} <Link href="/auth/register" className="font-medium text-primary hover:underline">{t("auth.login.footer.link")}</Link></>}
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          <p className="font-medium">Development access</p>
          <p className="mt-1">Use any password and an email like farmer@rscn.local, cooperative@rscn.local, manufacturer@rscn.local, supplier@rscn.local, buyer@rscn.local, retailer@rscn.local, warehouse@rscn.local, transport@rscn.local, driver@rscn.local, government@rscn.local, bank@rscn.local, or admin@rscn.local.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label={t("auth.login.email")}>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputCls} autoComplete="email" required />
          </Field>
          <Field label={t("auth.login.password")}>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputCls} autoComplete="current-password" required />
          </Field>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="rounded border-border" /> {t("auth.login.remember")}
            </label>
            <Link href="/auth/forgot-password" className="font-medium text-primary hover:underline">{t("auth.login.forgot")}</Link>
          </div>
          {err && <p className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-xs text-danger">{err}</p>}
          <button type="submit" disabled={busy} className={primaryBtn}>
            {busy ? t("auth.login.signingIn") : t("auth.login.button")}
          </button>
        </form>
        <GoogleButton onClick={handleGoogle} disabled={busy} />
      </div>
    </AuthShell>
  );
}
