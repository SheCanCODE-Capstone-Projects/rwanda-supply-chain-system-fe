import Link from "next/link";
import { AuthShell, primaryBtn, secondaryBtn } from "@/components/auth/AuthShell";
import { ShieldOff } from "lucide-react";

export default function SuspendedPage() {
  return (
    <AuthShell title="Account suspended" description="Your account has been suspended by an administrator.">
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-danger/10 text-danger"><ShieldOff className="h-6 w-6" /></div>
        <p className="mt-4 text-sm text-muted-foreground">Contact support if you believe this is a mistake.</p>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <Link href="/contact" className={primaryBtn}>Contact Support</Link>
        <Link href="/auth/login" className={secondaryBtn}>Back to Login</Link>
      </div>
    </AuthShell>
  );
}
