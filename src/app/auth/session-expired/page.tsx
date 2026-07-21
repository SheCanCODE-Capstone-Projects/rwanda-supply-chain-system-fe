import Link from "next/link";
import { AuthShell, primaryBtn } from "@/components/auth/AuthShell";
import { TimerReset } from "lucide-react";

export default function SessionExpiredPage() {
  return (
    <AuthShell title="Session expired" description="For your security we signed you out. Please sign in again.">
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-warning/10 text-warning"><TimerReset className="h-6 w-6" /></div>
      </div>
      <Link href="/auth/login" className={`mt-6 ${primaryBtn}`}>Sign in again</Link>
    </AuthShell>
  );
}
