"use client";
import { ReactNode, useState, ComponentType, SVGProps } from "react";
import Link from "next/link";
import { ChevronRight, Home, Search, Filter, Download, Plus, Inbox, AlertCircle } from "lucide-react";

// Local type for lucide-react icon components (SVG React components)
export type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

/* ── Breadcrumb ── */
export type Crumb = { label: string; href?: string };

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
      <Link href="/" className="hover:text-foreground"><Home className="h-3 w-3" /></Link>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 opacity-40" />
          {c.href && i < crumbs.length - 1
            ? <Link href={c.href} className="hover:text-foreground">{c.label}</Link>
            : <span className={i === crumbs.length - 1 ? "font-medium text-foreground" : ""}>{c.label}</span>
          }
        </span>
      ))}
    </nav>
  );
}

/* ── PageHeader ── */
export function PageHeader({
  title, description, crumbs, actions,
}: {
  title: string; description?: string;
  crumbs?: Crumb[]; actions?: ReactNode;
}) {
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

/* ── PageBody ── */
export function PageBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-4 md:p-6 ${className}`}>{children}</div>;
}

/* ── StatusBadge ── */
type Tone = "success" | "warning" | "danger" | "info" | "muted";
const TONE_CLS: Record<Tone, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger:  "bg-danger/10 text-danger",
  info:    "bg-secondary/10 text-secondary",
  muted:   "bg-muted text-muted-foreground",
};

export function StatusBadge({ tone = "muted", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${TONE_CLS[tone]}`}>
      {children}
    </span>
  );
}

export function statusTone(v: string): Tone {
  if (["Active","Completed","Approved","Delivered","Confirmed"].includes(v)) return "success";
  if (["Pending","Draft","Loading"].includes(v)) return "warning";
  if (["Cancelled","Rejected","Overdue","Failed"].includes(v)) return "danger";
  if (["In Transit","Processing","On Trip"].includes(v)) return "info";
  return "muted";
}

/* ── KpiCard ── */
export function KpiCard({
  label, value, delta, up, icon: Icon, accent = "#166534",
}: {
  label: string; value: string; delta?: string; up?: boolean;
  icon: LucideIcon; accent?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ backgroundColor: `${accent}22`, color: accent }}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {delta && (
        <div className={`mt-1 text-xs font-medium ${up ? "text-success" : "text-danger"}`}>
          {up ? "↑" : "↓"} {delta}
        </div>
      )}
    </div>
  );
}

/* ── ActionButton ── */
export function ActionBtn({
  label, icon: Icon, onClick, variant = "primary", href,
}: {
  label: string; icon?: LucideIcon; onClick?: () => void;
  variant?: "primary" | "outline"; href?: string;
}) {
  const cls = `inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition ${
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary-hover"
      : "border border-border bg-background hover:bg-surface"
  }`;
  if (href) return <Link href={href} className={cls}>{Icon && <Icon className="h-4 w-4" />}{label}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{Icon && <Icon className="h-4 w-4" />}{label}</button>;
}

/* ── DataTable ── */
export type Column<T = Record<string, unknown>> = {
  key: keyof T & string;
  label: string;
  tone?: (v: unknown) => Tone | null;
  render?: (v: unknown, row: T) => ReactNode;
};

export function DataTable<T extends Record<string, unknown>>({
  columns, rows, onView, onEdit, onCreate, createLabel = "New",
  searchable = true, tabs, empty = "No records yet.",
}: {
  columns: Column<T>[];
  rows: T[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onCreate?: () => void;
  createLabel?: string;
  searchable?: boolean;
  tabs?: string[];
  empty?: string;
}) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const filtered = search
    ? rows.filter((r) => columns.some((c) => String(r[c.key] ?? "").toLowerCase().includes(search.toLowerCase())))
    : rows;

  return (
    <div className="rounded-xl border border-border bg-background shadow-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
        {searchable && (
          <div className="relative flex-1 min-w-50">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}
        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm hover:bg-surface">
          <Filter className="h-4 w-4" /> Filter
        </button>
        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm hover:bg-surface">
          <Download className="h-4 w-4" /> Export
        </button>
        {onCreate && (
          <button
            onClick={onCreate}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" /> {createLabel}
          </button>
        )}
      </div>

      {/* Tabs */}
      {tabs && (
        <div className="flex gap-1 border-b border-border px-3 pt-2">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`h-9 border-b-2 px-3 text-sm font-medium transition ${
                activeTab === i ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs text-muted-foreground">
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>
              ))}
              {(onView || onEdit) && <th className="px-4 py-3 text-right font-medium">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-14 text-center">
                  <EmptyState message={empty} />
                </td>
              </tr>
            ) : filtered.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                {columns.map((c) => {
                  const v = row[c.key];
                  const tone = c.tone?.(v);
                  return (
                    <td key={c.key} className="px-4 py-3">
                      {c.render
                        ? c.render(v, row)
                        : tone
                          ? <StatusBadge tone={tone}>{String(v)}</StatusBadge>
                          : <span className="text-foreground">{String(v ?? "—")}</span>
                      }
                    </td>
                  );
                })}
                {(onView || onEdit) && (
                  <td className="px-4 py-3 text-right">
                    {onView && (
                      <button onClick={() => onView(row)} className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10">
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="rounded-md px-2 py-1 text-xs font-medium hover:bg-surface">
                        Edit
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border p-3 text-xs text-muted-foreground">
        <span>Showing {filtered.length} of {rows.length}</span>
        <div className="flex gap-1">
          <button className="h-8 rounded-md border border-border px-3 hover:bg-surface disabled:opacity-40" disabled>Previous</button>
          <button className="h-8 rounded-md border border-border px-3 hover:bg-surface">Next</button>
        </div>
      </div>
    </div>
  );
}

/* ── EmptyState ── */
export function EmptyState({ title, message, icon: Icon = Inbox }: { title?: string; message?: string; icon?: LucideIcon }) {
  return (
    <div className="flex flex-col items-center gap-2 py-4 text-muted-foreground">
      <Icon className="h-8 w-8 opacity-30" />
      {title && <p className="text-sm font-medium text-foreground">{title}</p>}
      {message && <p className="text-xs">{message}</p>}
    </div>
  );
}

/* ── ErrorState ── */
export function ErrorState({ message = "Something went wrong.", onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-danger/20 bg-danger/5 p-10 text-center">
      <AlertCircle className="h-8 w-8 text-danger" />
      <p className="text-sm font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface">
          Try again
        </button>
      )}
    </div>
  );
}

/* ── Modal ── */
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-surface">
            <Search className="h-4 w-4 rotate-45 text-muted-foreground" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── FormField ── */
export function FormField({ label, required, children, error }: {
  label: string; required?: boolean; children: ReactNode; error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label}{required && <span className="ml-0.5 text-danger">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export const inputCls = "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
