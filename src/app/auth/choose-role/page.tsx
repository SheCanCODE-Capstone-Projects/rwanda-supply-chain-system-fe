"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, primaryBtn } from "@/components/auth/AuthShell";
import { ALL_ROLES, ROLE_META, Role, roleDashboard } from "@/lib/auth/roles";
import { signInAs } from "@/lib/auth/session";


export default function ChooseRolePage() {
  const [selected, setSelected] = useState<Role>("farmer");
  const router = useRouter();
  return (
    <AuthShell title="Choose your role" description="This tailors your dashboard, modules and permissions.">
      <div className="grid grid-cols-2 gap-3">
        {ALL_ROLES.map((r) => {
          const meta = ROLE_META[r];
          const Icon = meta.icon;
          const active = selected === r;
          return (
            <button
              key={r}
              onClick={() => setSelected(r)}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm ${
                active ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary hover:bg-primary/5"
              }`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-medium">{meta.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex gap-2">
        <Link href="/auth/kyc" className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium hover:bg-surface">
          Continue to KYC
        </Link>
        <button
          onClick={async () => { await signInAs(selected); router.push(roleDashboard(selected)); }}
          className={primaryBtn + " flex-1"}
        >
          Enter dashboard
        </button>
      </div>
    </AuthShell>
  );
}
