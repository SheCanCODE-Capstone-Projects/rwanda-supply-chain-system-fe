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

type IconComponent = ComponentType<{
  className?: string;
  size?: number;
  strokeWidth?: number;
}>;

const stats = [
  { value: "12,480+", label: "Businesses onboarded" },
  { value: "48", label: "Districts covered" },
  { value: "1.2M", label: "Tons moved / year" },
  { value: "99.9%", label: "Platform uptime" },
];

const problems = [
  {
    title: "Invisible inventory",
    description:
      "Producers, warehouses and retailers can't see each other's stock in real time.",
  },
  {
    title: "Manual logistics",
    description:
      "Transport is booked over phone; deliveries lose 20-30% of value to delays.",
  },
  {
    title: "Broken financing",
    description:
      "Banks and buyers can't verify inventory, contracts or transactions on paper.",
  },
];

const workflow = [
  {
    step: "01",
    icon: Sprout,
    title: "Produce",
    description:
      "Farmers & cooperatives list produce with quality and quantity.",
  },
  {
    step: "02",
    icon: Warehouse,
    title: "Store",
    description:
      "Warehouses reserve space and track stock, temperature, expiry.",
  },
  {
    step: "03",
    icon: Truck,
    title: "Move",
    description: "Transporters accept jobs, optimize routes, prove delivery.",
  },
  {
    step: "04",
    icon: ShoppingCart,
    title: "Sell",
    description:
      "Buyers, retailers and exporters procure, pay and reconcile.",
  },
];

const modules = [
  {
    icon: UsersRound,
    title: "Identity & Organizations",
    description:
      "KYC, business verification, roles, departments, audit logs.",
  },
  {
    icon: Package,
    title: "Products & Inventory",
    description:
      "Batches, barcodes, QR, quality certificates, expiry tracking.",
  },
  {
    icon: ShoppingCart,
    title: "Smart Marketplace",
    description: "RFQs, negotiation, contracts, purchase & sales orders.",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Zones, racks, reservations, temperature monitoring.",
  },
  {
    icon: Truck,
    title: "Transportation",
    description: "Fleet, GPS, route optimization, proof of delivery.",
  },
  {
    icon: Boxes,
    title: "Procurement",
    description: "Supplier directory, comparisons, POs, performance.",
  },
];

const stakeholders = [
  {
    icon: Sprout,
    title: "For producers",
    benefits: [
      "Reach buyers nationally",
      "Get paid on delivery",
      "Track quality & batches",
    ],
  },
  {
    icon: Factory,
    title: "For businesses",
    benefits: [
      "Real-time inventory",
      "Automated procurement",
      "One-click transport",
    ],
  },
  {
    icon: Landmark,
    title: "For government",
    benefits: [
      "National production visibility",
      "Food security dashboard",
      "Policy-grade analytics",
    ],
  },
];

const testimonials = [
  {
    quote: "We moved from paper receipts to real-time inventory in a week.",
    name: "Aline U.",
    role: "Manager, Musanze Cooperative",
  },
  {
    quote: "Our transport costs dropped 22% after route optimization.",
    name: "Eric N.",
    role: "Ops Director, Kigali Logistics",
  },
  {
    quote:
      "For the first time we have national food supply data by district.",
    name: "Dr. P. Habimana",
    role: "MINAGRI",
  },
];

const partners = ["MINAGRI", "RRA", "BNR", "MINICOM", "RSSB", "RIB"];

const plans = [
  {
    name: "Starter",
    price: "Free",
    audience: "For farmers & small retailers",
    features: ["Up to 100 products", "Marketplace access", "Basic reporting"],
  },
  {
    name: "Business",
    price: "RWF 45,000/mo",
    audience: "For SMEs & cooperatives",
    popular: true,
    features: [
      "Unlimited products",
      "Warehouse & transport",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    audience: "For institutions & government",
    features: [
      "National dashboards",
      "SLA & dedicated support",
      "Custom integrations",
      "On-premise options",
    ],
  },
];

const faqs = [
  "Who can use RSCN?",
  "Is my data secure?",
  "How do I get onboarded?",
  "Do you integrate with banks & tax?",
];

const footerColumns = [
  {
    title: "Platform",
    links: ["Solutions", "Industries", "Pricing", "Partners"],
  },
  {
    title: "Company",
    links: ["About", "Resources", "Contact", "Book Demo"],
  },
  {
    title: "Account",
    links: ["Login", "Register", "Forgot Password", "Dashboard"],
  },
];

function LogoMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#05662d] text-xl font-bold text-white">
      R
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-4xl text-center ${className}`}>
      <p className="text-sm font-bold uppercase text-[#006b35]">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#061226] md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function IconTile({
  icon: Icon,
  tone = "green",
}: {
  icon: IconComponent;
  tone?: "green" | "blue" | "red";
}) {
  const styles = {
    green: "bg-[#e8f3ee] text-[#00733b]",
    blue: "bg-[#eaf0ff] text-[#2563eb]",
    red: "bg-[#ffe9ec] text-[#ff2f35]",
  };

  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-lg ${styles[tone]}`}
    >
      <Icon className="h-6 w-6" strokeWidth={2.4} />
    </span>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-lg text-[#5f6c80]">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00733b]" />
      <span>{children}</span>
    </li>
  );
}

function DashboardMock() {
  const shipments = [
    {
      name: "Maize",
      amount: "12 tons",
      route: "Musanze -> Kigali",
      status: "In transit",
      statusClass: "bg-[#eef2ff] text-[#1d4ed8]",
    },
    {
      name: "Coffee",
      amount: "8 tons",
      route: "Huye -> Rusizi",
      status: "Delivered",
      statusClass: "bg-[#dff3e8] text-[#00733b]",
    },
    {
      name: "Fertilizer",
      amount: "40 pallets",
      route: "Kigali -> Nyagatare",
      status: "Loading",
      statusClass: "bg-[#fff6df] text-[#e28a00]",
    },
  ];

  return (
    <div className="rounded-lg border border-[#d9e1ea] bg-[#f5f8fb] p-5 shadow-lg">
      <div className="rounded-lg border border-[#d9e1ea] bg-white p-6">
        <div className="flex items-start justify-between border-b border-[#d9e1ea] pb-5">
          <div>
            <p className="text-base text-[#5f6c80]">
              National Dashboard &middot; Q3 2026
            </p>
            <p className="mt-1 text-lg font-bold text-[#061226]">
              Live supply activity
            </p>
          </div>
          <span className="flex items-center gap-2 text-base text-[#00733b]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#45ad73]" />
            Live
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            ["Active orders", "12,483", "+8.2%"],
            ["In transit", "1,204", "+3.1%"],
            ["Warehouse fill", "68%", "+1.4%"],
          ].map(([label, value, change]) => (
            <div
              key={label}
              className="rounded-lg border border-[#d9e1ea] bg-[#f4f7fb] p-4"
            >
              <p className="text-sm text-[#68758a]">{label}</p>
              <p className="mt-2 text-3xl font-extrabold text-[#061226]">
                {value}
              </p>
              <p className="mt-1 text-sm text-[#00733b]">{change}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {shipments.map((shipment) => (
            <div
              key={shipment.name}
              className="flex items-center justify-between rounded-lg border border-[#d9e1ea] px-4 py-3"
            >
              <div>
                <p className="text-lg font-bold text-[#061226]">
                  {shipment.name} &middot; {shipment.amount}
                </p>
                <p className="text-sm text-[#5f6c80]">{shipment.route}</p>
              </div>
              <span
                className={`rounded-lg px-3 py-1 text-sm font-semibold ${shipment.statusClass}`}
              >
                {shipment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#061226]">
      <header className="border-b border-[#d9e1ea] bg-white">
        <nav className="mx-auto flex h-[84px] max-w-[1550px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <span className="text-xl font-extrabold">RSCN</span>
            <span className="hidden text-base text-[#657184] sm:inline">
              &middot; Rwanda Supply Chain Network
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              className="rounded-lg bg-[#e8f3ee] px-4 py-3 text-lg font-semibold text-[#006b35]"
            >
              Home
            </Link>
            <a
              href="#pricing"
              className="rounded-lg px-4 py-3 text-lg font-semibold text-[#657184]"
            >
              Pricing
            </a>
            <a
              href="#industries"
              className="rounded-lg px-4 py-3 text-lg font-semibold text-[#657184]"
            >
              Industries
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-lg font-semibold text-[#111827]">
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-[#05662d] px-5 py-3 text-lg font-bold text-white"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-[1550px] items-center gap-16 px-6 py-28 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-[#d9e1ea] bg-[#f8fafc] px-4 py-2 text-base text-[#5f6c80]">
            <span className="h-2 w-2 rounded-full bg-[#00733b]" />
            National digital infrastructure
          </div>

          <h1 className="mt-7 max-w-[720px] text-6xl font-extrabold leading-[0.98] text-[#111827] md:text-7xl">
            Rwanda&apos;s national supply chain, connected.
          </h1>

          <p className="mt-8 max-w-[720px] text-2xl leading-9 text-[#5f6c80]">
            RSCN unifies farmers, cooperatives, manufacturers, warehouses,
            transporters, retailers, banks and government into one intelligent
            platform - from harvest to shelf.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="inline-flex h-14 items-center gap-3 rounded-lg bg-[#05662d] px-6 text-lg font-extrabold text-white"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button
              type="button"
              className="inline-flex h-14 items-center gap-3 rounded-lg border border-[#d9e1ea] bg-white px-6 text-lg font-extrabold text-[#061226]"
            >
              <CirclePlay className="h-5 w-5" />
              Watch Demo
            </button>
            <a
              href="#modules"
              className="inline-flex h-14 items-center gap-3 px-6 text-lg font-extrabold text-[#006b35]"
            >
              Explore Platform
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-9 gap-y-4 text-lg text-[#5f6c80]">
            {[
              "ISO 27001 aligned",
              "WCAG AA accessible",
              "Kinyarwanda / English / French",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#00733b]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <DashboardMock />
      </section>

      <section className="border-y border-[#d9e1ea] bg-[#f4f7fb]">
        <div className="mx-auto grid max-w-[1550px] grid-cols-2 gap-10 px-6 py-14 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-extrabold text-[#061226]">
                {stat.value}
              </p>
              <p className="mt-2 text-lg text-[#5f6c80]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[#d9e1ea] px-6 py-24">
        <SectionTitle
          eyebrow="The problem"
          title="Rwanda's supply chain is fragmented."
        />
        <div className="mx-auto mt-14 grid max-w-[1540px] gap-5 md:grid-cols-3">
          {problems.map((problem) => (
            <article
              key={problem.title}
              className="rounded-lg border border-[#d9e1ea] bg-white p-8"
            >
              <IconTile icon={AlertTriangle} tone="red" />
              <h3 className="mt-6 text-xl font-extrabold">{problem.title}</h3>
              <p className="mt-4 text-lg leading-7 text-[#5f6c80]">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-[#d9e1ea] px-6 py-24">
        <SectionTitle
          eyebrow="How RSCN works"
          title="From harvest to shelf, on one network."
        />
        <div className="mx-auto mt-14 grid max-w-[1540px] gap-5 lg:grid-cols-4">
          {workflow.map((item) => (
            <article
              key={item.step}
              className="relative rounded-lg border border-[#d9e1ea] bg-white p-8"
            >
              <span className="absolute right-6 top-6 text-base font-bold text-[#657184]">
                {item.step}
              </span>
              <IconTile icon={item.icon} />
              <h3 className="mt-6 text-xl font-extrabold">{item.title}</h3>
              <p className="mt-4 text-lg leading-7 text-[#5f6c80]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="modules" className="border-b border-[#d9e1ea] px-6 py-24">
        <SectionTitle
          eyebrow="Platform modules"
          title="Everything a national supply chain needs."
        />
        <div className="mx-auto mt-14 grid max-w-[1540px] gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <article
              key={module.title}
              className="rounded-lg border border-[#d9e1ea] bg-white p-8"
            >
              <IconTile icon={module.icon} tone="blue" />
              <h3 className="mt-7 text-xl font-extrabold">{module.title}</h3>
              <p className="mt-4 text-lg leading-7 text-[#5f6c80]">
                {module.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="industries" className="border-b border-[#d9e1ea] px-6 py-24">
        <SectionTitle
          eyebrow="Why RSCN"
          title="Built for every stakeholder in the chain."
        />
        <div className="mx-auto mt-14 grid max-w-[1540px] gap-5 lg:grid-cols-3">
          {stakeholders.map((stakeholder) => (
            <article
              key={stakeholder.title}
              className="rounded-lg border border-[#d9e1ea] bg-white p-8"
            >
              <IconTile icon={stakeholder.icon} />
              <h3 className="mt-7 text-xl font-extrabold">{stakeholder.title}</h3>
              <ul className="mt-5 space-y-3">
                {stakeholder.benefits.map((benefit) => (
                  <CheckItem key={benefit}>{benefit}</CheckItem>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-[#d9e1ea] px-6 py-24">
        <SectionTitle
          eyebrow="Testimonials"
          title="Trusted by cooperatives, exporters and institutions."
        />
        <div className="mx-auto mt-14 grid max-w-[1540px] gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-lg border border-[#d9e1ea] bg-white p-8"
            >
              <div className="flex gap-1 text-[#f59e0b]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-lg leading-7 text-[#061226]">
                &quot;{testimonial.quote}&quot;
              </p>
              <p className="mt-6 text-lg font-extrabold">{testimonial.name}</p>
              <p className="text-base text-[#5f6c80]">{testimonial.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-[#d9e1ea] bg-[#f4f7fb] px-6 py-12">
        <p className="text-center text-base font-bold uppercase text-[#657184]">
          Partners & integrations
        </p>
        <div className="mx-auto mt-6 grid max-w-[1540px] gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="rounded-lg border border-[#d9e1ea] bg-white px-8 py-6 text-center text-lg font-extrabold text-[#657184]"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-b border-[#d9e1ea] px-6 py-24">
        <SectionTitle
          eyebrow="Pricing"
          title="Simple plans for every stakeholder."
        />
        <div className="mx-auto mt-14 grid max-w-[1540px] gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-lg border bg-white p-8 ${
                plan.popular ? "border-[#00733b]" : "border-[#d9e1ea]"
              }`}
            >
              {plan.popular ? (
                <span className="inline-flex rounded-full bg-[#00733b] px-3 py-1 text-sm font-extrabold text-white">
                  Most popular
                </span>
              ) : null}
              <h3 className="mt-4 text-2xl font-extrabold">{plan.name}</h3>
              <p className="mt-5 text-4xl font-extrabold">{plan.price}</p>
              <p className="mt-2 text-lg text-[#5f6c80]">{plan.audience}</p>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <CheckItem key={feature}>{feature}</CheckItem>
                ))}
              </ul>
              <Link
                href="/register"
                className={`mt-8 flex h-12 items-center justify-center rounded-lg border text-lg font-extrabold ${
                  plan.popular
                    ? "border-[#05662d] bg-[#05662d] text-white"
                    : "border-[#d9e1ea] bg-white text-[#061226]"
                }`}
              >
                Get Started
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-[#d9e1ea] px-6 py-24">
        <SectionTitle eyebrow="FAQ" title="Common questions." />
        <div className="mx-auto mt-14 max-w-[960px] overflow-hidden rounded-lg border border-[#d9e1ea] bg-white">
          {faqs.map((question) => (
            <button
              key={question}
              type="button"
              className="flex w-full items-center justify-between border-b border-[#d9e1ea] px-6 py-7 text-left text-lg font-extrabold last:border-b-0"
            >
              {question}
              <Plus className="h-5 w-5 text-[#5f6c80]" />
            </button>
          ))}
        </div>
      </section>

      <section className="bg-[#06662e] px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Join Rwanda&apos;s national supply chain network.
          </h2>
          <p className="mt-8 text-2xl">
            Register your business in minutes. No credit card required to start.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="flex h-14 items-center rounded-lg bg-white px-7 text-lg font-extrabold text-[#05662d]"
            >
              Register
            </Link>
            <button
              type="button"
              className="flex h-14 items-center rounded-lg border border-white/30 px-7 text-lg font-extrabold text-white"
            >
              Book Demo
            </button>
            <Link
              href="/contact"
              className="flex h-14 items-center px-7 text-lg font-extrabold text-white"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#f4f7fb]">
        <div className="mx-auto grid max-w-[1540px] gap-12 px-6 py-16 lg:grid-cols-[1.4fr_2.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark />
              <span className="text-xl font-extrabold">RSCN</span>
            </div>
            <p className="mt-5 max-w-[520px] text-lg leading-7 text-[#5f6c80]">
              Rwanda Supply Chain Network - connecting every product, every
              business, every movement across the nation.
            </p>
            <form className="mt-6 flex max-w-[480px] gap-3">
              <input
                aria-label="Newsletter email"
                placeholder="Newsletter email"
                className="h-12 min-w-0 flex-1 rounded-lg border border-[#d9e1ea] bg-white px-4 text-lg outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#05662d] px-6 text-lg font-extrabold text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-lg font-extrabold">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-lg text-[#5f6c80]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[#d9e1ea]">
          <div className="mx-auto flex max-w-[1540px] flex-col gap-4 px-6 py-8 text-base text-[#5f6c80] sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 2026 Rwanda Supply Chain Network. All rights reserved.</span>
            <span>Kigali, Rwanda</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
