import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = { title: "Contact — RSCN", description: "Contact the Rwanda Supply Chain Network sales and support team." };

export default function ContactPage() {
  return (
    <MarketingShell>
      <section className="container-rscn py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Contact</div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Talk to sales or support.</h1>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            {[
              [Mail, "sales@rscn.rw"],
              [Phone, "+250 788 000 000"],
              [MapPin, "KG 9 Ave, Kigali, Rwanda"],
            ].map(([Icon, v]) => (
              <div key={v as string} className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
                <Icon className="h-5 w-5 text-primary" />
                <div className="text-sm">{v as string}</div>
              </div>
            ))}
          </div>
          <form className="rounded-xl border border-border bg-background p-6 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <input placeholder="Full name" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <input placeholder="Email" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <input placeholder="Company" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:col-span-2" />
              <textarea placeholder="How can we help?" rows={5} className="rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:col-span-2" />
            </div>
            <button type="button" className="mt-4 inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">Send message</button>
          </form>
        </div>
      </section>
    </MarketingShell>
  );
}
