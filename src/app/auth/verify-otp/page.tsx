import Link from "next/link";
import { AuthShell, primaryBtn, secondaryBtn } from "@/components/auth/AuthShell";

export default function VerifyOtpPage() {
  return (
    <AuthShell title="Enter verification code" description="We sent a 6-digit code to your phone.">
      <div className="flex justify-between gap-2">
        {Array.from({length: 6}).map((_, i) => (
          <input key={i} maxLength={1} className="h-14 w-full max-w-[52px] rounded-lg border border-border bg-background text-center text-lg font-semibold outline-none focus:ring-2 focus:ring-ring" />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Didn&apos;t receive it?</span>
        <button className="font-medium text-primary hover:underline">Resend OTP</button>
      </div>
      <div className="mt-6 space-y-2">
        <Link href="/auth/choose-role" className={primaryBtn}>Verify</Link>
        <Link href="/auth/register" className={secondaryBtn}>Back</Link>
      </div>
    </AuthShell>
  );
}
