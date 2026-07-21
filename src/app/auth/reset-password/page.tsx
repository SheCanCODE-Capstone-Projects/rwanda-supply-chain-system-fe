import Link from "next/link";
import { AuthShell, Field, inputCls, primaryBtn } from "@/components/auth/AuthShell";

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Set a new password" description="Choose a strong password you haven't used before.">
      <form className="space-y-4" action="#">
        <Field label="New password"><input type="password" className={inputCls} /></Field>
        <Field label="Confirm new password"><input type="password" className={inputCls} /></Field>
        <Link href="/auth/login" className={primaryBtn}>Reset password</Link>
      </form>
    </AuthShell>
  );
}
