import { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function MarketingShell({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-dvh flex-col bg-background">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        </div>
    );
}