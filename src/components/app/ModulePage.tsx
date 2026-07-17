"use client";
import { ReactNode, useMemo, useState } from "react";
import { PageBody, PageHeader } from "./PageChrome";
import { Download, Filter, Plus, Search } from "lucide-react";

export type Column = { key: string; label: string; badge?: (v: any) => string | null };

export function ModulePage({
  title, description, crumbs, primaryAction, tabs, columns, rows, empty,
}: {
  title: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
  primaryAction?: { label: string; icon?: any; onClick?: () => void };
  tabs?: string[];
  columns: Column[];
  rows: Record<string, any>[];
  empty?: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const Icon = primaryAction?.icon ?? Plus;

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const term = search.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(term)),
    );
  }, [rows, columns, search]);

  return (
    <>
      <PageHeader title={title} description={description} crumbs={crumbs} actions={
        <>
          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-surface"
          >
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button
            type="button"
            onClick={() => setMessage("Export is a placeholder action for this demo.")}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-surface"
          >
            <Download className="h-4 w-4" /> Export
          </button>
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              <Icon className="h-4 w-4" /> {primaryAction.label}
            </button>
          )}
        </>
      } />

      <PageBody>
        {showFilters && (
          <div className="mb-3 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
            <div className="font-medium text-foreground">Filter options</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <button className="rounded-lg border border-border bg-background px-3 py-2 text-left text-sm hover:bg-white/80">Status: Any</button>
              <button className="rounded-lg border border-border bg-background px-3 py-2 text-left text-sm hover:bg-white/80">Date: Last 30 days</button>
              <button className="rounded-lg border border-border bg-background px-3 py-2 text-left text-sm hover:bg-white/80">Category: All</button>
            </div>
          </div>
        )}

        {tabs && tabs.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1 border-b border-border">
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                className={`h-9 rounded-t-md border-b-2 px-3 text-sm font-medium ${
                  i === 0 ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => {}}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="rounded-xl border border-border bg-background shadow-card">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1 min-w-55">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button className="h-9 rounded-lg border border-border px-3 text-sm hover:bg-surface">All statuses</button>
            <button className="h-9 rounded-lg border border-border px-3 text-sm hover:bg-surface">Date range</button>
          </div>

          {message && (
            <div className="border-b border-border bg-primary/5 px-3 py-2 text-sm text-primary">{message}</div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left text-muted-foreground">
                  {columns.map((c) => (
                    <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-muted-foreground">
                      {empty ?? "No data yet"}
                    </td>
                  </tr>
                ) : filteredRows.map((r, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-surface/60 transition-colors">
                    {columns.map((c) => {
                      const v = r[c.key];
                      const badge = c.badge?.(v);
                      return (
                        <td key={c.key} className="px-4 py-3">
                          {badge ? <StatusBadge tone={badge as any}>{String(v)}</StatusBadge> : <span className="text-foreground">{String(v)}</span>}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-right">
                      <button className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10">View</button>
                      <button className="ml-2 rounded-md px-2 py-1 text-xs font-medium hover:bg-surface">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-border p-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>Showing {filteredRows.length} of {rows.length}</span>
            <div className="flex gap-1">
              <button className="h-8 rounded-md border border-border px-2 hover:bg-surface disabled:opacity-40" disabled>
                Previous
              </button>
              <button className="h-8 rounded-md border border-border px-2 hover:bg-surface">
                Next
              </button>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}

export function StatusBadge({ tone = "muted", children }: { tone?: "success" | "warning" | "danger" | "info" | "muted"; children: ReactNode }) {
  const map = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger:  "bg-danger/10 text-danger",
    info:    "bg-secondary/10 text-secondary",
    muted:   "bg-muted text-muted-foreground",
  } as const;
  return <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${map[tone]}`}>{children}</span>;
}
