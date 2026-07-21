import Link from "next/link";
import { AuthShell, primaryBtn, secondaryBtn } from "@/components/auth/AuthShell";
import { Clock } from "lucide-react";

export default function PendingPage() {
  return (
    <AuthShell title="Verification pending" description="Your business is under review.">
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-warning/10 text-warning"><Clock className="h-6 w-6" /></div>
        <p className="mt-4 text-sm text-muted-foreground">Review typically completes within 24 hours. We&apos;ll email you once approved.</p>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <Link href="/" className={primaryBtn}>Back to Home</Link>
        <Link href="/contact" className={secondaryBtn}>Contact Support</Link>
      </div>
    </AuthShell>
  );
}
