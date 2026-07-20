import { MarketingShell } from "@/components/marketing/MarketingShell";

export const metadata = { title: "Partners — RSCN", description: "Government and enterprise partners of the Rwanda Supply Chain Network." };

export default function PartnersPage() {
  const partners = ["MINAGRI","RRA","BNR","MINICOM","RSSB","RIB","Bank of Kigali","Equity Bank","I&M Bank","MTN","Airtel","RwandAir"];
  return (
    <MarketingShell>
      <section className="container-rscn py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Partners</div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Backed by Rwanda&apos;s leading institutions.</h1>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <div key={p} className="grid h-20 place-items-center rounded-xl border border-border bg-background text-sm font-semibold text-muted-foreground">{p}</div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
