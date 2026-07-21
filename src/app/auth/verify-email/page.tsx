import Link from "next/link";
import { AuthShell, primaryBtn } from "@/components/auth/AuthShell";
import { MailCheck } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <AuthShell title="Verify your email" description="We've sent a verification link to your inbox.">
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <MailCheck className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-3 text-sm text-muted-foreground">Click the link in the email to continue. It may take a minute to arrive.</p>
        <button className="mt-4 text-sm font-medium text-primary hover:underline">Resend email</button>
      </div>
      <Link href="/auth/verify-otp" className={`mt-6 ${primaryBtn}`}>Continue</Link>
    </AuthShell>
  );
}
