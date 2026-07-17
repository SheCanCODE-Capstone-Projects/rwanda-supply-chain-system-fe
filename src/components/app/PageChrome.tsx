import { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "./PageComponents";

export function PageHeader({
  title, description, crumbs, actions,
}: { title: string; description?: string; crumbs?: Crumb[]; actions?: ReactNode }) {
  return (
    <div className="border-b border-border bg-background">
      <div className="px-4 py-4 md:px-6">
        {crumbs && crumbs.length > 0 && <div className="mb-2"><Breadcrumb crumbs={crumbs} /></div>}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight">{title}</h1>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return <div className="p-4 md:p-6">{children}</div>;
}
