import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Package, Warehouse, Truck, Users, ShoppingCart, BarChart3, CreditCard, Landmark, Boxes, ArrowRight } from "lucide-react";

export const metadata = { title: "Solutions — RSCN", description: "Modules for identity, inventory, marketplace, warehousing, transport, procurement and payments." };

const MODULES = [
  [Users, "Identity & Organizations", "KYC, roles, departments, audit trails."],
  [Package, "Products & Inventory", "Batches, barcodes, QR, expiry, low-stock alerts."],
  [ShoppingCart, "Smart Marketplace", "RFQ, negotiation, POs, sales orders, reviews."],
  [Warehouse, "Warehousing", "Zones, racks, reservations, temperature."],
  [Truck, "Transportation", "Fleet, GPS, route optimization, POD."],
  [Boxes, "Procurement", "Suppliers, comparisons, contracts, performance."],
  [CreditCard, "Payments & Wallet", "Invoices, subscriptions, refunds."],
  [BarChart3, "Analytics & Forecast", "Sales, demand, regional dashboards."],
  [Landmark, "Government Dashboard", "National production and food supply."],
] as const;

export default function SolutionsPage() {
  return (
    <MarketingShell>
      <section className="border-b border-border">
        <div className="container-rscn py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Solutions</div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Nine modules. One connected platform.</h1>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map(([Icon, t, d]) => (
              <div key={t} className="rounded-xl border border-border bg-background p-6 hover:border-primary/40">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                <Link href="/auth/login" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Explore <ArrowRight className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
