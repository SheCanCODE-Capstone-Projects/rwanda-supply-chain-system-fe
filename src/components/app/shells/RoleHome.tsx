"use client";
import { ReactElement } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import {
  ArrowUpRight, ArrowDownRight, type LucideIcon,
  Users, ShieldCheck, Activity, Server, Landmark, Warehouse, Truck, Store,
  Package, Sprout, ShoppingCart, CreditCard, Boxes, Factory, ClipboardList,
  BarChart3, FileSignature, PackageCheck, Heart, MapPin, Star, CircleDollarSign,
  PackageOpen, Building2, Fuel, Route as RouteIcon, Handshake,
} from "lucide-react";
import { Role, ROLE_META } from "@/lib/auth/roles";
import { PageBody, PageHeader } from "../PageChrome";
import { ROLE_CONFIG } from "./roleConfig";
import { useRouter } from "next/navigation";

export type Kpi = { label: string; value: string; delta?: string; up?: boolean; icon: string };

const KPI_ICONS: Record<string, LucideIcon> = {
  Users, ShieldCheck, Activity, Server, Landmark, Warehouse, Truck, Store,
  Package, Sprout, ShoppingCart, CreditCard, Boxes, Factory, ClipboardList,
  BarChart3, FileSignature, PackageCheck, Heart, MapPin, Star, CircleDollarSign,
  PackageOpen, Building2, Fuel, RouteIcon, Handshake,
};

export type HomeSpec = {
  greeting: string;
  subtitle: string;
  kpis: Kpi[];
  chart: {
    kind: "area" | "bar" | "line" | "pie";
    title: string;
    data: Record<string, unknown>[];
    xKey?: string;
    yKey?: string;
  };
  side: { title: string; items: { label: string; value: string; tone?: "success" | "warning" | "danger" }[] };
  activity: { title: string; when: string; who?: string }[];
};

export function RoleHome({ role, spec }: { role: Role; spec: HomeSpec }) {
  const meta = ROLE_META[role];
  const cfg = ROLE_CONFIG[role];
  const router = useRouter();
  const go = (slug: string) =>
    router.push(slug ? `${meta.home}/${slug}` : meta.home);

  return (
    <>
      <PageHeader
        title={spec.greeting}
        description={spec.subtitle}
        actions={
          <div className="flex flex-wrap gap-2">
            {cfg.quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.label}
                  onClick={() => go(qa.slug)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-white"
                  style={{ backgroundColor: meta.accent }}
                >
                  <Icon className="h-4 w-4" /> {qa.label}
                </button>
              );
            })}
          </div>
        }
      />
      <PageBody>
        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {spec.kpis.map((k) => {
            const Icon = KPI_ICONS[k.icon] ?? Users;
            return (
              <div key={k.label} className="rounded-xl border border-border bg-background p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k.label}</div>
                  <div
                    className="grid h-8 w-8 place-items-center rounded-lg"
                    style={{ backgroundColor: `${meta.accent}22`, color: meta.accent }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 text-2xl font-semibold">{k.value}</div>
                {k.delta && (
                  <div className={`mt-1 flex items-center gap-1 text-xs ${k.up ? "text-success" : "text-danger"}`}>
                    {k.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {k.delta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Chart + side panel */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-4 shadow-card lg:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold">{spec.chart.title}</div>
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                {renderChart(spec.chart, meta.accent)}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4 shadow-card">
            <div className="mb-3 text-sm font-semibold">{spec.side.title}</div>
            <ul className="space-y-2">
              {spec.side.items.map((it) => (
                <li key={it.label} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                  <span className="text-foreground">{it.label}</span>
                  <span className={`text-xs font-semibold ${
                    it.tone === "warning" ? "text-warning" :
                    it.tone === "danger" ? "text-danger" :
                    "text-success"
                  }`}>{it.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-4 rounded-xl border border-border bg-background p-4 shadow-card">
          <div className="mb-3 text-sm font-semibold">Recent activity</div>
          <ul className="divide-y divide-border">
            {spec.activity.map((a, i) => (
              <li key={i} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{a.title}</div>
                  {a.who && <div className="text-xs text-muted-foreground">{a.who}</div>}
                </div>
                <span className="text-xs text-muted-foreground">{a.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageBody>
    </>
  );
}

function renderChart(c: HomeSpec["chart"], color: string): ReactElement {
  const xKey = c.xKey ?? "x";
  const yKey = c.yKey ?? "y";
  const grid = { strokeDasharray: "3 3", stroke: "hsl(var(--border))" };
  const axis = { stroke: "hsl(var(--muted-foreground))", fontSize: 11 };

  switch (c.kind) {
    case "area":
      return (
        <AreaChart data={c.data}>
          <defs>
            <linearGradient id="rh-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...grid} />
          <XAxis dataKey={xKey} {...axis} />
          <YAxis {...axis} />
          <Tooltip />
          <Area type="monotone" dataKey={yKey} stroke={color} fill="url(#rh-area)" strokeWidth={2} />
        </AreaChart>
      );
    case "bar":
      return (
        <BarChart data={c.data}>
          <CartesianGrid {...grid} />
          <XAxis dataKey={xKey} {...axis} />
          <YAxis {...axis} />
          <Tooltip />
          <Bar dataKey={yKey} fill={color} radius={[6, 6, 0, 0]} />
        </BarChart>
      );
    case "line":
      return (
        <LineChart data={c.data}>
          <CartesianGrid {...grid} />
          <XAxis dataKey={xKey} {...axis} />
          <YAxis {...axis} />
          <Tooltip />
          <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      );
    case "pie":
      return (
        <PieChart>
          <Pie data={c.data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
            {c.data.map((_, i) => (
              <Cell key={i} fill={[color, "#2563EB", "#F59E0B", "#EF4444", "#8B5CF6"][i % 5]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      );
  }
}
