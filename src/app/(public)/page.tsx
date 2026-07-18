"use client";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  CheckCircle2,
  CirclePlay,
  Factory,
  Landmark,
  Package,
  Plus,
  ShoppingCart,
  Sprout,
  Star,
  Truck,
  UsersRound,
  Warehouse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type IconComponent = ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;

const stats = [
  { value: "12,480+", label: "Businesses onboarded" },
  { value: "48",      label: "Districts covered" },
  { value: "1.2M",   label: "Tons moved / year" },
  { value: "99.9%",  label: "Platform uptime" },
];

const problems = [
  { title: "Invisible inventory",  description: "Producers, warehouses and retailers can't see each other's stock in real time." },
  { title: "Manual logistics",     description: "Transport is booked over phone; deliveries lose 20–30% of value to delays." },
  { title: "Broken financing",     description: "Banks and buyers can't verify inventory, contracts or transactions on paper." },
];

const workflow = [
  { step: "01", icon: Sprout,       title: "Produce", description: "Farmers & cooperatives list produce with quality and quantity." },
  { step: "02", icon: Warehouse,    title: "Store",   description: "Warehouses reserve space and track stock, temperature, expiry." },
  { step: "03", icon: Truck,        title: "Move",    description: "Transporters accept jobs, optimize routes, prove delivery." },
  { step: "04", icon: ShoppingCart, title: "Sell",    description: "Buyers, retailers and exporters procure, pay and reconcile." },
];

const modules = [
  { icon: UsersRound,   title: "Identity & Organizations", description: "KYC, business verification, roles, departments, audit logs." },
  { icon: Package,      title: "Products & Inventory",     description: "Batches, barcodes, QR, quality certificates, expiry tracking." },
  { icon: ShoppingCart, title: "Smart Marketplace",        description: "RFQs, negotiation, contracts, purchase & sales orders." },
  { icon: Warehouse,    title: "Warehousing",              description: "Zones, racks, reservations, temperature monitoring." },
  { icon: Truck,        title: "Transportation",           description: "Fleet, GPS, route optimization, proof of delivery." },
  { icon: Boxes,        title: "Procurement",              description: "Supplier directory, comparisons, POs, performance." },
];

const stakeholders = [
  { icon: Sprout,   title: "For producers",  benefits: ["Reach buyers nationally", "Get paid on delivery", "Track quality & batches"] },
  { icon: Factory,  title: "For businesses", benefits: ["Real-time inventory", "Automated procurement", "One-click transport"] },
  { icon: Landmark, title: "For government", benefits: ["National production visibility", "Food security dashboard", "Policy-grade analytics"] },
];

const testimonials = [
  { quote: "We moved from paper receipts to real-time inventory in a week.",    name: "Aline U.",        role: "Manager, Musanze Cooperative" },
  { quote: "Our transport costs dropped 22% after route optimization.",         name: "Eric N.",         role: "Ops Director, Kigali Logistics" },
  { quote: "For the first time we have national food supply data by district.", name: "Dr. P. Habimana", role: "MINAGRI" },
];

const partners = ["MINAGRI", "RRA", "BNR", "MINICOM", "RSSB", "RIB"];

const plans = [
  { name: "Starter",    price: "Free",          audience: "For farmers & small retailers", popular: false, features: ["Up to 100 products", "Marketplace access", "Basic reporting"] },
  { name: "Business",   price: "RWF 45,000/mo", audience: "For SMEs & cooperatives",       popular: true,  features: ["Unlimited products", "Warehouse & transport", "Advanced analytics", "Priority support"] },
  { name: "Enterprise", price: "Custom",         audience: "For institutions & government", popular: false, features: ["National dashboards", "SLA & dedicated support", "Custom integrations", "On-premise options"] },
];

const faqs = [
  "Who can use RSCN?",
  "Is my data secure?",
  "How do I get onboarded?",
  "Do you integrate with banks & tax?",
];

const footerColumns = [
  { title: "Platform", links: ["Solutions", "Industries", "Pricing", "Partners"] },
  { title: "Company",  links: ["About", "Resources", "Contact", "Book Demo"] },
  { title: "Account",  links: ["Login", "Register", "Forgot Password", "Dashboard"] },
];

// ─── Shared layout wrapper ────────────────────────────────────────────────────
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10 ${className}`}>
      {children}
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
      R
    </span>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground">{title}</h2>
    </div>
  );
}

// ─── Icon tile ────────────────────────────────────────────────────────────────
function IconTile({ icon: Icon, tone = "green" }: { icon: IconComponent; tone?: "green" | "blue" | "red" }) {
  const styles = {
    green: "bg-primary/10 text-primary",
    blue:  "bg-blue-50 text-blue-600",
    red:   "bg-red-50 text-red-500",
  };
  return (
    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles[tone]}`}>
      <Icon className="h-5 w-5" strokeWidth={2} />
    </span>
  );
}

// ─── Check list item ──────────────────────────────────────────────────────────
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-sm text-muted-foreground">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  );
}

// ─── Dashboard mock ───────────────────────────────────────────────────────────
function DashboardMock() {
  const shipments = [
    { name: "Maize",      amount: "12 tons",    route: "Musanze → Kigali",   status: "In transit", dot: "bg-blue-500",   badge: "bg-blue-50 text-blue-700" },
    { name: "Coffee",     amount: "8 tons",     route: "Huye → Rusizi",      status: "Delivered",  dot: "bg-primary",    badge: "bg-primary/10 text-primary" },
    { name: "Fertilizer", amount: "40 pallets", route: "Kigali → Nyagatare", status: "Loading",    dot: "bg-amber-500",  badge: "bg-amber-50 text-amber-700" },
  ];

  return (
    <div className="rounded-3xl border border-border bg-muted/40 p-6 shadow-lg">
      <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-5">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">National Dashboard · Q3 2026</p>
            <p className="text-sm font-semibold text-foreground">Live supply activity</p>
          </div>
          <span className="flex items-center gap-2 text-xs font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Live
          </span>
        </div>

        {/* KPI tiles */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Active orders", "12,483", "+8.2%"],
            ["In transit",    "1,204",  "+3.1%"],
            ["Warehouse fill","68%",    "+1.4%"],
          ].map(([label, value, change]) => (
            <div key={label} className="space-y-1 rounded-xl border border-border bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
              <p className="text-xs font-medium text-primary">{change}</p>
            </div>
          ))}
        </div>

        {/* Shipment rows */}
        <div className="space-y-2">
          {shipments.map((s) => (
            <div key={s.name} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.name} · {s.amount}</p>
                  <p className="text-xs text-muted-foreground">{s.route}</p>
                </div>
              </div>
              <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${s.badge}`}>{s.status}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <Container>
          <nav className="flex h-20 items-center justify-between gap-12">
            <Link href="/" className="flex items-center gap-3">
              <LogoMark />
              <span className="text-base font-bold tracking-tight text-foreground">RSCN</span>
              <span className="hidden text-sm text-muted-foreground sm:inline">· Rwanda Supply Chain Network</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <Link href="/" className="text-sm font-medium text-primary">Home</Link>
              <a href="#modules"    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Platform</a>
              <a href="#pricing"    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
              <a href="#industries" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Industries</a>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Log in
              </Link>
              <Button asChild size="sm">
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          </nav>
        </Container>
      </header>

      {/* ── Hero ── */}
      <section className="py-24">
        <Container>
          <div className="grid items-center gap-20 lg:grid-cols-2">

            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" />
                National digital infrastructure
              </div>

              <div className="space-y-6">
                <h1 className="max-w-[600px] text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                  Rwanda&apos;s national supply chain, connected.
                </h1>
                <p className="max-w-[550px] text-lg leading-8 text-muted-foreground">
                  RSCN unifies farmers, cooperatives, manufacturers, warehouses, transporters, retailers, banks and government into one intelligent platform — from harvest to shelf.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="gap-2 rounded-xl font-semibold">
                  <Link href="/register">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" className="gap-2 rounded-xl">
                  <CirclePlay className="h-4 w-4" /> Watch Demo
                </Button>
                <Button variant="link" size="lg" asChild className="gap-2">
                  <a href="#modules">
                    Explore Platform <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {["ISO 27001 aligned", "WCAG AA accessible", "Kinyarwanda / English / French"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <DashboardMock />
          </div>
        </Container>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-border bg-muted/40 py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Problem ── */}
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="The problem" title="Rwanda's supply chain is fragmented." />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {problems.map((p) => (
              <Card key={p.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <CardHeader className="space-y-4 p-0">
                  <IconTile icon={AlertTriangle} tone="red" />
                  <CardTitle className="text-lg font-semibold">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-3">
                  <CardDescription className="text-sm leading-7">{p.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-border bg-muted/40 py-24">
        <Container>
          <SectionHeading eyebrow="How RSCN works" title="From harvest to shelf, on one network." />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <Card key={item.step} className="relative rounded-2xl border bg-card p-6 shadow-sm">
                <CardHeader className="space-y-4 p-0">
                  <span className="absolute right-5 top-5 text-xs font-bold text-muted-foreground">{item.step}</span>
                  <IconTile icon={item.icon} />
                  <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-3">
                  <CardDescription className="text-sm leading-7">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Modules ── */}
      <section id="modules" className="border-t border-border py-24">
        <Container>
          <SectionHeading eyebrow="Platform modules" title="Everything a national supply chain needs." />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <Card key={m.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <CardHeader className="space-y-4 p-0">
                  <IconTile icon={m.icon} tone="blue" />
                  <CardTitle className="text-lg font-semibold">{m.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-3">
                  <CardDescription className="text-sm leading-7">{m.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Stakeholders ── */}
      <section id="industries" className="border-t border-border bg-muted/40 py-24">
        <Container>
          <SectionHeading eyebrow="Why RSCN" title="Built for every stakeholder in the chain." />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {stakeholders.map((s) => (
              <Card key={s.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <CardHeader className="space-y-4 p-0">
                  <IconTile icon={s.icon} />
                  <CardTitle className="text-lg font-semibold">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <ul className="space-y-3">
                    {s.benefits.map((b) => <CheckItem key={b}>{b}</CheckItem>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading eyebrow="Testimonials" title="Trusted by cooperatives, exporters and institutions." />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="rounded-2xl border bg-card p-6 shadow-sm">
                <CardHeader className="p-0">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <p className="text-sm leading-7 text-foreground">&quot;{t.quote}&quot;</p>
                </CardContent>
                <CardFooter className="flex-col items-start gap-0.5 p-0 pt-5">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Partners ── */}
      <section className="border-t border-border bg-muted/40 py-16">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Partners &amp; integrations
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((p) => (
              <div key={p} className="rounded-xl border border-border bg-card px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                {p}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-t border-border py-24">
        <Container>
          <SectionHeading eyebrow="Pricing" title="Simple plans for every stakeholder." />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`rounded-2xl border bg-card p-6 shadow-sm ${plan.popular ? "border-primary ring-1 ring-primary" : ""}`}
              >
                <CardHeader className="space-y-3 p-0">
                  {plan.popular && (
                    <span className="inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <p className="text-3xl font-bold tracking-tight text-foreground">{plan.price}</p>
                  <CardDescription className="text-sm">{plan.audience}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6">
                  <ul className="space-y-3">
                    {plan.features.map((f) => <CheckItem key={f}>{f}</CheckItem>)}
                  </ul>
                </CardContent>
                <CardFooter className="p-0 pt-8">
                  <Button
                    asChild
                    className="w-full rounded-xl"
                    variant={plan.popular ? "primary" : "secondary"}
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-border bg-muted/40 py-24">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Common questions." />
          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card">
            {faqs.map((q) => (
              <button
                key={q}
                type="button"
                className="flex w-full items-center justify-between border-b border-border px-6 py-5 text-left text-sm font-semibold text-foreground last:border-b-0 hover:bg-muted/60 transition-colors"
              >
                {q}
                <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border py-24">
        <Container>
          <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Join Rwanda&apos;s national supply chain network.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
              Register your business in minutes. No credit card required to start.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-card font-semibold text-primary hover:bg-card/90"
              >
                <Link href="/register">Register free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Book a demo
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-xl text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact">Contact sales</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-muted/40 py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_2.2fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <LogoMark />
                <span className="text-base font-bold text-foreground">RSCN</span>
              </div>
              <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                Rwanda Supply Chain Network — connecting every product, every business, every movement across the nation.
              </p>
              <form className="flex max-w-sm gap-2">
                <input
                  aria-label="Newsletter email"
                  placeholder="Your email"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
                />
                <Button type="submit" size="sm">Subscribe</Button>
              </form>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {footerColumns.map((col) => (
                <div key={col.title} className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                  <ul className="space-y-3">
                    {col.links.map((item) => (
                      <li key={item}>
                        <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 2026 Rwanda Supply Chain Network. All rights reserved.</span>
            <span>Kigali, Rwanda</span>
          </div>
        </Container>
      </footer>

    </main>
  );
}
