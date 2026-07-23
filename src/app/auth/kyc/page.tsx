import Link from "next/link";
import { AuthShell, Field, inputCls, primaryBtn, secondaryBtn } from "@/components/auth/AuthShell";
import { Upload } from "lucide-react";

export default function KycPage() {
  return (
    <AuthShell title="Business & KYC verification" description="We verify every business to keep the network secure.">
      <form className="space-y-4" action="#">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business name"><input className={inputCls} /></Field>
          <Field label="TIN / RDB number"><input className={inputCls} /></Field>
          <Field label="Business type">
            <select className={inputCls}>
              {["Cooperative","Manufacturer","Warehouse","Transport","Retailer","Wholesaler","Bank"].map((x)=><option key={x}>{x}</option>)}
            </select>
          </Field>
          <Field label="District"><input className={inputCls} /></Field>
        </div>
        <Field label="Upload documents" hint="RDB certificate, ID of representative, address proof.">
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-surface p-4 text-sm">
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Drag files here or</span>
            <button type="button" className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium">Choose files</button>
          </div>
        </Field>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/auth/two-factor" className={primaryBtn}>Submit for verification</Link>
          <Link href="/auth/choose-role" className={secondaryBtn}>Back</Link>
        </div>
      </form>
    </AuthShell>
  );
}
