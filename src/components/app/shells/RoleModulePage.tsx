"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Role, ROLE_META } from "@/lib/auth/roles";
import { ROLE_CONFIG, NavItem } from "./roleConfig";
import { ModulePage } from "../ModulePage";
import { PageBody, PageHeader } from "../PageChrome";
import { loadAuditFromServer, logAction, useAudit } from "@/lib/audit-log";
import { getSession } from "@/lib/auth/session";
import { useT } from "@/lib/i18n";

type Row = { id: string; name: string; party: string; value: string; status: string };

const SAMPLE_COLS = [
  { key: "id", label: "Reference" },
  { key: "name", label: "Name" },
  { key: "party", label: "Party" },
  { key: "value", label: "Value" },
  {
    key: "status", label: "Status", badge: (v: string) =>
      v === "Active" || v === "Completed" || v === "Approved" ? "success" :
      v === "Pending" || v === "Draft" ? "warning" :
      v === "Cancelled" || v === "Rejected" ? "danger" : "info",
  },
];

function seedRows(prefix: string): Row[] {
  const names = ["Maize batch", "Rice shipment", "Coffee lot", "Cassava order", "Beans delivery", "Tea consignment", "Wheat order", "Milk collection"];
  const parties = ["Kigali Coop", "Rwanda Foods Ltd", "East Retail", "MINAGRI", "AgriFinance", "Musanze Union"];
  const statuses = ["Active", "Pending", "Completed", "Draft", "Rejected"];
  return Array.from({ length: 8 }, (_, i) => ({
    id: `${prefix.toUpperCase()}-${String(1001 + i)}`,
    name: names[i % names.length],
    party: parties[i % parties.length],
    value: `RWF ${(120 + i * 47).toLocaleString()}k`,
    status: statuses[i % statuses.length],
  }));
}

export function RoleModulePage({ role, slug: slugProp }: { role: Role; slug?: string }) {
  const params = useParams() as { slug?: string[] };
  const slug = slugProp ?? (params.slug ?? []).join("/") ?? "";
  const cfg = ROLE_CONFIG[role];
  const meta = ROLE_META[role];
  const segments = slug.split("/").filter(Boolean);
  const primary = segments[0] ?? "";
  const item = cfg.nav.find((n) => n.slug === primary);
  const t = useT();

  if (!item) {
    return (
      <>
        <PageHeader title={t("module.notFound.title")} description={`${meta.label} — ${t("module.notFound.desc")}`} />
        <PageBody>
          <div className="rounded-xl border border-dashed border-border bg-background p-8 text-center text-sm text-muted-foreground">
            <code className="rounded bg-surface px-1">{slug || "(empty)"}</code>
          </div>
        </PageBody>
      </>
    );
  }

  if (role === "super_admin" && primary === "audit" && segments.length === 1) return <AuditLogView />;
  if (segments.length > 1) return <ModuleSubPage role={role} item={item} segments={segments} />;

  return <ModuleWithNew role={role} slug={primary} label={item.label} icon={item.icon} />;
}

function ModuleSubPage({ role, item, segments }: { role: Role; item: NavItem; segments: string[] }) {
  const meta = ROLE_META[role];
  const t = useT();
  const lastSegment = segments[segments.length - 1] ?? "details";
  const isCreate = segments.includes("new") || segments.includes("create");
  const label = item.label;

  const crumbs = [
    { label: meta.short, href: meta.home },
    { label, href: `${meta.home}/${item.slug}` },
    { label: isCreate ? t("form.create") : lastSegment },
  ];

  return (
    <>
      <PageHeader
        title={isCreate ? `${t("form.create")} ${label}` : `${label} ${t("module.detailsTitle")}`}
        description={`${meta.label} · ${label} workspace`}
        crumbs={crumbs}
      />
      <PageBody>
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="text-sm text-muted-foreground">
              {isCreate ? t("module.createHint") : t("module.reviewHint")}
            </div>
            <div className="mt-4 space-y-4">
              {isCreate ? (
                <div className="space-y-3">
                  <div className="rounded-xl border border-border bg-surface p-4 text-sm">{t("module.placeholder")} {label}</div>
                  <div className="flex flex-wrap gap-2">
                    <button className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-hover">{t("form.save")}</button>
                    <button className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm hover:bg-surface">{t("form.cancel")}</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-3 rounded-xl border border-border bg-surface p-4 text-sm">
                    <div><span className="font-semibold">{t("module.reference")}</span>: {segments.join("/")}</div>
                    <div><span className="font-semibold">{t("module.status")}</span>: {t("module.status.active")}</div>
                    <div><span className="font-semibold">{t("module.assignedTo")}</span>: {meta.short}</div>
                  </div>
                  <div className="grid gap-2 text-sm">
                    <p>{t("module.detailSummary")}</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          const s = getSession();
                          logAction({
                            actor: s?.claims.name ?? "guest",
                            actorId: s?.claims.sub ?? "anonymous",
                            role: (s?.claims.role ?? "anonymous") as Role | "anonymous",
                            action: "module.approve",
                            resource: `${meta.home}/${item.slug}/${segments.join("/")}`,
                          });
                        }}
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
                      >{t("module.approve")}</button>
                      <button
                        onClick={() => {
                          const s = getSession();
                          logAction({
                            actor: s?.claims.name ?? "guest",
                            actorId: s?.claims.sub ?? "anonymous",
                            role: (s?.claims.role ?? "anonymous") as Role | "anonymous",
                            action: "module.edit",
                            resource: `${meta.home}/${item.slug}/${segments.join("/")}`,
                          });
                        }}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm hover:bg-surface"
                      >{t("module.edit")}</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-card">
            <div className="text-sm font-semibold text-foreground">{t("module.activityFeed")}</div>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>{t("module.activity.system")}</li>
              <li>{t("module.activity.review")}</li>
              <li>{t("module.activity.created")} {meta.short} 1 day ago</li>
            </ul>
          </div>
        </div>
      </PageBody>
    </>
  );
}

function ModuleWithNew({ role, slug, label, icon }: {
  role: Role; slug: string; label: string; icon: any;
}) {
  const meta = ROLE_META[role];
  const t = useT();
  const [rows, setRows] = useState<Row[]>(() => seedRows(slug || "rec"));
  const [open, setOpen] = useState(false);

  return (
    <>
      <ModulePage
        title={label}
        description={`${meta.label} · ${label} workspace`}
        crumbs={[
          { label: meta.short, href: meta.home },
          { label, href: `${meta.home}/${slug}` },
        ]}
        primaryAction={{ label: `${t("module.new")} ${label.split(" ")[0]}`, icon, onClick: () => setOpen(true) }}
        tabs={[t("module.tab.all"), t("module.tab.recent"), t("module.tab.pending"), t("module.tab.archived")]}
        columns={SAMPLE_COLS}
        rows={rows}
        empty={t("module.empty")}
      />
      {open && (
        <NewRecordDialog
          prefix={slug || "rec"}
          label={label}
          onClose={() => setOpen(false)}
          onCreate={(row) => {
            setRows((prev) => [row, ...prev]);
            const s = getSession();
            logAction({
              actor: s?.claims.name ?? "guest",
              actorId: s?.claims.sub ?? "anonymous",
              role: (s?.claims.role ?? "anonymous") as Role | "anonymous",
              action: `${slug || "record"}.create`,
              resource: `${meta.home}/${slug}/${row.id}`,
              meta: { name: row.name, party: row.party, value: row.value, status: row.status },
            });
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

function NewRecordDialog({ prefix, label, onClose, onCreate }: {
  prefix: string; label: string; onClose: () => void; onCreate: (r: Row) => void;
}) {
  const t = useT();
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("Draft");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !party.trim() || !value.trim()) {
      setErr(t("form.required"));
      return;
    }
    onCreate({
      id: `${prefix.toUpperCase()}-${String(Date.now()).slice(-6)}`,
      name: name.trim(),
      party: party.trim(),
      value: /^rwf/i.test(value) ? value.trim() : `RWF ${value.trim()}`,
      status,
    });
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"
      >
        <h2 className="text-lg font-semibold">{t("module.new")} — {label}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{t("module.createRecord")}</p>
        <div className="mt-4 space-y-3">
          <Field label={t("form.name")}>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={ip} placeholder={t("module.placeholder.name")} />
          </Field>
          <Field label={t("form.party")}>
            <input value={party} onChange={(e) => setParty(e.target.value)} className={ip} placeholder={t("module.placeholder.party")} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("form.value")}>
              <input value={value} onChange={(e) => setValue(e.target.value)} className={ip} placeholder={t("module.placeholder.value")} />
            </Field>
            <Field label={t("form.status")}>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={ip}>
                <option value="Draft">{t("module.status.draft")}</option><option value="Pending">{t("module.status.pending")}</option><option value="Active">{t("module.status.active")}</option>
                <option value="Completed">{t("module.status.completed")}</option><option value="Rejected">{t("module.status.rejected")}</option>
              </select>
            </Field>
          </div>
          {err && <p className="text-xs text-danger">{err}</p>}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-surface">
            {t("form.cancel")}
          </button>
          <button type="submit" className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-hover">
            {t("form.create")}
          </button>
        </div>
      </form>
    </div>
  );
}

const ip = "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function AuditLogView() {
  const t = useT();
  const entries = useAudit();
  const [filter, setFilter] = useState("all");
  useEffect(() => { void loadAuditFromServer(); }, []);

  const visibleEntries = entries.filter((entry) => filter === "all" || entry.role === filter);

  function exportAudit(kind: "csv" | "pdf") {
    const header = [t("audit.col.timestamp"), t("audit.col.actor"), t("audit.col.role"), t("audit.col.action"), t("audit.col.resource")];
    const rows = visibleEntries.map((entry) => [new Date(entry.ts).toISOString(), entry.actor, entry.role, entry.action, entry.resource ?? ""]);
    const csv = [header.join(","), ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-${kind}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    if (kind === "pdf") {
      window.alert(t("table.exportPdf"));
    }
  }

  return (
    <>
      <PageHeader
        title={t("audit.title")}
        description={t("audit.desc")}
        actions={
          <div className="flex gap-2">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 rounded-lg border border-border bg-background px-3 text-sm">
              <option value="all">{t("audit.filter.all")}</option>
              <option value="super_admin">super admin</option>
              <option value="government">government</option>
              <option value="farmer">farmer</option>
              <option value="cooperative">cooperative</option>
              <option value="manufacturer">manufacturer</option>
              <option value="supplier">supplier</option>
              <option value="buyer">buyer</option>
              <option value="retailer">retailer</option>
              <option value="warehouse">warehouse</option>
              <option value="transport">transport</option>
              <option value="driver">driver</option>
              <option value="bank">bank</option>
            </select>
            <button onClick={() => exportAudit("csv")} className="h-10 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-surface">{t("audit.export.csv")}</button>
            <button onClick={() => exportAudit("pdf")} className="h-10 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover">{t("audit.export.pdf")}</button>
          </div>
        }
      />
      <PageBody>
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left">{t("audit.col.when")}</th>
                <th className="px-4 py-2 text-left">{t("audit.col.user")}</th>
                <th className="px-4 py-2 text-left">{t("audit.col.role")}</th>
                <th className="px-4 py-2 text-left">{t("audit.col.action")}</th>
                <th className="px-4 py-2 text-left">{t("audit.col.target")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleEntries.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">{t("audit.empty")}</td></tr>
              )}
              {visibleEntries.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-2 text-xs text-muted-foreground">{new Date(e.ts).toLocaleString()}</td>
                  <td className="px-4 py-2 font-medium">{e.actor}</td>
                  <td className="px-4 py-2">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {e.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">{e.action}</td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">{e.resource ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageBody>
    </>
  );
}
