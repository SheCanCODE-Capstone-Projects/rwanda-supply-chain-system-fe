"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthShell, Field, inputCls, primaryBtn } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { useAuth } from "@/providers/AuthProvider";
import { ROLE_META, ALL_ROLES, type Role } from "@/lib/auth/roles";

export default function LoginPage() {
  const { signInAs } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Demo: derive role from email prefix or let user pick
  const [demoRole, setDemoRole] = useState<Role>("retailer");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      const session = await signInAs(demoRole);
      if (session) {
        const dest = redirect ?? ROLE_META[session.claims.role].home + "/dashboard";
        router.push(dest);
      }
    } catch {
      setError("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Sign in to RSCN"
      description="Enter your credentials to access your dashboard."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Demo role selector */}
        <div className="rounded-lg border border-border bg-surface p-4 text-sm">
          <p className="mb-2 font-medium text-foreground">Demo — sign in as:</p>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {ALL_ROLES.map((r) => {
              const meta = ROLE_META[r];
              const Icon = meta.icon;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setDemoRole(r)}
                  className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                    demoRole === r
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-surface text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {meta.short}
                </button>
              );
            })}
          </div>
        </div>

        <Field label="Email address">
          <input
            type="email"
            autoComplete="email"
            placeholder={`${demoRole}@rscn.demo`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Password">
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="mt-1 flex justify-end">
            <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        </Field>

        {error && (
          <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </button>

        <div className="relative flex items-center gap-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          or
        </div>

        <GoogleButton label="Continue with Google" to="/auth/choose-role" />
      </form>
    </AuthShell>
  );
}
