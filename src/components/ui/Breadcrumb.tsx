import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/utils";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <Link href="/" className="flex items-center gap-1 hover:text-foreground">
        <Home className="h-3 w-3" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 opacity-50" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-foreground">{item.label}</Link>
          ) : (
            <span className={i === items.length - 1 ? "text-foreground font-medium" : ""}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
