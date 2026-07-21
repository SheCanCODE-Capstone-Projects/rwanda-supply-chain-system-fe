import Link from "next/link";
import { AuthShell, Field, inputCls, primaryBtn } from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Forgot password?" description="Enter your email and we'll send a reset link."
      footer={<>Remembered it? <Link href="/auth/login" className="font-medium text-primary hover:underline">Login</Link></>}>
      <form className="space-y-4" action="#">
        <Field label="Email"><input type="email" className={inputCls} placeholder="you@company.rw" /></Field>
        <Link href="/auth/reset-password" className={primaryBtn}>Send reset link</Link>
      </form>
    </AuthShell>
  );
}
