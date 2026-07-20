import { MarketingShell } from "@/components/marketing/MarketingShell";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Book a Demo — RSCN", description: "Book a live walkthrough of the Rwanda Supply Chain Network platform." };

export default function BookDemoPage() {
  return (
    <MarketingShell>
      <section className="container-rscn py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Book Demo</div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">See RSCN in action.</h1>
            <p className="mt-4 text-muted-foreground">A 30-minute walkthrough tailored to your role — producer, transporter, retailer, bank or government.</p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Live end-to-end demo","Custom to your industry","Q&A with our solutions team","Proposal & next steps"].map((x) => (
                <li key={x} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{x}</li>
              ))}
            </ul>
          </div>
          <form className="rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="grid gap-4">
              <input placeholder="Full name" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <input placeholder="Work email" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <input placeholder="Company" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <select className="h-11 rounded-lg border border-border bg-background px-3 text-sm">
                <option>I am a…</option>
                {["Farmer","Cooperative","Manufacturer","Warehouse","Transporter","Retailer","Bank","Government"].map((r) => <option key={r}>{r}</option>)}
              </select>
              <textarea placeholder="Anything specific you'd like to see?" rows={4} className="rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <button type="button" className="h-11 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-hover">Request Demo</button>
            </div>
          </form>
        </div>
      </section>
    </MarketingShell>
  );
}
