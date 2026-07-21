"use client";

import Link from "next/link";
import { AuthShell, primaryBtn } from "@/components/auth/AuthShell";
import { useT } from "@/lib/i18n";

export default function TermsPage() {
  const t = useT();
  return (
    <AuthShell title={t("auth.terms.title")} description={t("auth.terms.description")}>
      <div className="max-h-72 overflow-y-auto rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
        <p>{t("auth.terms.body")}</p>
        <p className="mt-3">{t("auth.terms.summary")}</p>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm"><input type="checkbox" className="rounded border-border" /> {t("auth.terms.accept")}</label>
      <Link href="/auth/register" className={`mt-4 ${primaryBtn}`}>{t("auth.register.continue")}</Link>
    </AuthShell>
  );
}
