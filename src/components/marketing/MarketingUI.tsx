import { ReactNode, type ComponentType } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

// ─── PageSection ────────────────────────────────────────────────────────────
export function PageSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`border-b border-border bg-background ${className}`}>
      <div className="container-rscn py-16 md:py-24">{children}</div>
    </section>
  );
}

// ─── PageHeading ─────────────────────────────────────────────────────────────
export function PageHeading({
  eyebrow, title, subtitle, center = true,
}: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</div>}
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

// ─── FeatureCard ─────────────────────────────────────────────────────────────
export function FeatureCard({
  icon: Icon, title, desc, iconBg = "bg-primary/10 text-primary",
}: { icon: ComponentType<{ className?: string }>; title: string; desc: string; iconBg?: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-6 hover:border-primary/40 hover:shadow-card">
      <div className={`grid h-10 w-10 place-items-center rounded-lg ${iconBg}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-4 font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

// ─── SimpleCard ───────────────────────────────────────────────────────────────
export function SimpleCard({ title, desc, bg = "bg-background" }: { title: string; desc: string; bg?: string }) {
  return (
    <div className={`rounded-xl border border-border ${bg} p-6`}>
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

// ─── ResourceCard ─────────────────────────────────────────────────────────────
export function ResourceCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-6 hover:border-primary/40 hover:shadow-card">
      <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{tag}</span>
      <h2 className="mt-3 font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

// ─── PricingCard ──────────────────────────────────────────────────────────────
export function PricingCard({
  name, price, desc, features, featured = false, ctaHref = "/auth/register", ctaLabel = "Get Started",
}: {
  name: string; price: string; desc: string; features: string[];
  featured?: boolean; ctaHref?: string; ctaLabel?: string;
}) {
  return (
    <div className={`rounded-xl border p-6 bg-background ${featured ? "border-primary shadow-elevated" : "border-border"}`}>
      {featured && <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">Most popular</span>}
      <h2 className="mt-2 text-lg font-semibold">{name}</h2>
      <div className="mt-2 text-3xl font-bold">{price}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
      <ul className="mt-5 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{f}</li>
        ))}
      </ul>
      <Link href={ctaHref} className={`mt-6 inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-semibold ${featured ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "border border-border hover:bg-surface"}`}>
        {ctaLabel}
      </Link>
    </div>
  );
}

// ─── ContactInfo ──────────────────────────────────────────────────────────────
export function ContactInfo({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-sm text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}
