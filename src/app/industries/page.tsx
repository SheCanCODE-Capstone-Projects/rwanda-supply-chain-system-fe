import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Sprout, Factory, Warehouse, Truck, ShoppingCart, Landmark, Banknote, Store } from "lucide-react";

export const metadata = { title: "Industries — RSCN", description: "Built for agriculture, manufacturing, warehousing, transport, retail, finance and government." };

const INDUSTRIES = [
  [Sprout, "Agriculture", "Farmers, cooperatives, agri-exporters."],
  [Factory, "Manufacturing", "Producers, processors, packagers."],
  [Warehouse, "Warehousing", "Cold storage, distribution centers."],
  [Truck, "Transport & Logistics", "Fleets, drivers, freight forwarders."],
  [Store, "Retail & Wholesale", "Retailers, wholesalers, distributors."],
  [Banknote, "Financial Services", "Banks, MFIs, insurance."],
  [ShoppingCart, "E-commerce", "Marketplaces & online sellers."],
  [Landmark, "Government", "Ministries, agencies, regulators."],
] as const;

export default function IndustriesPage() {
  return (
    <MarketingShell>
      <section className="container-rscn py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Industries</div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">One platform, every stakeholder.</h1>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map(([Icon, t, d]) => (
            <div key={t} className="rounded-xl border border-border bg-background p-6">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary/10 text-secondary"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
