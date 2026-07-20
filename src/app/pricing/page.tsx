import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Pricing — RSCN", description: "Simple plans for farmers, SMEs, cooperatives and enterprises." };

const PLANS = [
  { name: "Starter", price: "Free", desc: "For farmers & small retailers", features: ["Up to 100 products","Marketplace access","Basic reporting","Email support"] },
  { name: "Business", price: "RWF 45,000/mo", desc: "For SMEs & cooperatives", features: ["Unlimited products","Warehouse & transport","Advanced analytics","Priority support","2FA & audit logs"], featured: true },
  { name: "Enterprise", price: "Custom", desc: "For institutions & government", features: ["National dashboards","Dedicated SLA","Custom integrations","On-premise options","Security review"] },
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <section className="container-rscn py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Pricing</div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Transparent pricing, no hidden fees.</h1>
          <p className="mt-4 text-muted-foreground">Pay in RWF. Cancel anytime. Government tenders available on request.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`rounded-xl border p-6 ${p.featured ? "border-primary bg-background shadow-elevated" : "border-border bg-background"}`}>
              {p.featured && <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">Most popular</span>}
              <h3 className="mt-2 text-lg font-semibold">{p.name}</h3>
              <div className="mt-2 text-3xl font-bold">{p.price}</div>
              <div className="text-sm text-muted-foreground">{p.desc}</div>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (<li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{f}</li>))}
              </ul>
              <Link href="/auth/register" className={`mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-semibold ${p.featured ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "border border-border hover:bg-surface"}`}>Get Started</Link>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
