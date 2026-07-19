import { MarketingShell } from "@/components/marketing/MarketingShell";

export const metadata = { title: "About — RSCN", description: "About the Rwanda Supply Chain Network." };

export default function About() {
  return (
    <MarketingShell>
      <section className="container-rscn py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">About RSCN</div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">A national platform for a national supply chain.</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            RSCN was built to connect every producer, business, warehouse, transporter and buyer
            in Rwanda — into one intelligent, secure, government-ready platform.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
          {[["Mission","Unify Rwanda's supply chain end-to-end."],["Vision","A digitally connected national economy."],["Values","Trust, transparency, inclusion."]].map(([t,d]) => (
            <div key={t} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
