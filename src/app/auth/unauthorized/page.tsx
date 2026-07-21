import Link from "next/link";
import { AuthShell, primaryBtn } from "@/components/auth/AuthShell";
import { ShieldOff } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <AuthShell title="Unauthorized" description="You don't have permission to access this page.">
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-danger/10 text-danger"><ShieldOff className="h-6 w-6" /></div>
      </div>
      <Link href="/auth/login" className={`mt-6 ${primaryBtn}`}>Back to Dashboard</Link>
    </AuthShell>
  );
}
