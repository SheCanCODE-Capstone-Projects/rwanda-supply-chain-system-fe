"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthShell, Field, inputCls, primaryBtn } from "@/components/auth/AuthShell";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { useAuth } from "@/providers/AuthProvider";
import { ROLE_META, ALL_ROLES, type Role } from "@/lib/auth/roles";

export default function RegisterPage() {
  const { signInAs } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<Role>("retailer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const session = await signInAs(role);
      if (session) {
        router.push(ROLE_META[session.claims.role].home + "/dashboard");
      }
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      description="Join Rwanda's national supply chain network."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Role picker */}
        <Field label="I am a…">
          <div className="mt-1 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {ALL_ROLES.filter((r) => r !== "super_admin" && r !== "driver").map((r) => {
              const meta = ROLE_META[r];
              const Icon = meta.icon;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                    role === r
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
        </Field>

        <Field label="Full name">
          <input
            type="text"
            autoComplete="name"
            placeholder="Jean Mugisha"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Work email">
          <input
            type="email"
            autoComplete="email"
            placeholder="you@organisation.rw"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Password">
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
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
          {password && <PasswordStrength value={password} />}
        </Field>

        {error && (
          <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
        </button>

        <div className="relative flex items-center gap-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          or
        </div>

        <GoogleButton label="Sign up with Google" to="/auth/choose-role" />

        <p className="text-center text-xs text-muted-foreground">
          By creating an account you agree to the{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>
      </form>
    </AuthShell>
  );
}
