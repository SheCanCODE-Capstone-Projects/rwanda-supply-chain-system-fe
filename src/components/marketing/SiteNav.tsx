"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/industries", label: "Industries" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-rscn flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-bold">R</div>
          <span className="font-semibold tracking-tight">RSCN</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">· Rwanda Supply Chain Network</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathname === n.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/auth/login" className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium hover:bg-surface">Login</Link>
          <Link href="/auth/register" className="inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover">Register</Link>
        </div>
        <button className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-rscn flex flex-col py-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm ${
                  pathname === n.to ? "bg-primary/10 text-primary" : "hover:bg-surface"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-border pt-2">
              <Link href="/auth/login" onClick={() => setOpen(false)} className="flex-1 h-9 grid place-items-center rounded-lg border border-border text-sm">Login</Link>
              <Link href="/auth/register" onClick={() => setOpen(false)} className="flex-1 h-9 grid place-items-center rounded-lg bg-primary text-primary-foreground text-sm">Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
