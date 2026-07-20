"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShieldOff, Home, ArrowLeft } from "lucide-react";
import { useSession } from "@/lib/auth/session";
import { ROLE_META } from "@/lib/auth/roles";

export default function ForbiddenPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const session = useSession();
  const meta = session ? ROLE_META[session.claims.role] : null;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-8 text-center shadow-card">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-danger/10 text-danger">
          <ShieldOff className="h-8 w-8" />
        </div>
        <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-danger">Error 403</div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your role does not have permission to open this page.
        </p>

        <dl className="mx-auto mt-6 grid max-w-sm grid-cols-1 gap-2 rounded-xl border border-border bg-surface p-4 text-left text-xs">
          {from && (
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-muted-foreground">Requested</dt>
              <dd className="truncate text-foreground">{from}</dd>
            </div>
          )}
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-muted-foreground">Signed in as</dt>
            <dd className="text-foreground">{session?.claims.name ?? "Not signed in"}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="font-medium text-muted-foreground">Current role</dt>
            <dd className="text-foreground">{meta?.label ?? "—"}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {meta && (
            <Link
              href={meta.home}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              <Home className="h-4 w-4" /> Back to your dashboard
            </Link>
          )}
          <Link
            href="/auth/login"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-surface"
          >
            <ArrowLeft className="h-4 w-4" /> Switch account
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          If you believe this is a mistake, contact your administrator.
        </p>
      </div>
    </div>
  );
}
