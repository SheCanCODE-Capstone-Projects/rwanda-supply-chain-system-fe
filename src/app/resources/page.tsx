import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { FileText, BookOpen, Newspaper, Video } from "lucide-react";

export const metadata = { title: "Resources — RSCN", description: "Docs, guides, case studies and press for RSCN." };

export default function ResourcesPage() {
  const items = [
    [BookOpen, "Documentation", "API, integrations and admin guides."],
    [FileText, "Case Studies", "How cooperatives and exporters use RSCN."],
    [Video, "Webinars", "Live sessions and recorded demos."],
    [Newspaper, "Press", "News and public announcements."],
  ] as const;
  return (
    <MarketingShell>
      <section className="container-rscn py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Resources</div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Learn, build, integrate.</h1>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map(([Icon, t, d]) => (
            <Link href="/contact" key={t} className="rounded-xl border border-border bg-background p-6 hover:border-primary/40">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary/10 text-secondary"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
