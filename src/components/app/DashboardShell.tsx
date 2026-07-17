"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { Bell, ChevronDown, LogOut, Menu, MessageSquare, Search, Globe, Sun, Moon, Zap, RefreshCw, Check, X } from "lucide-react";
import { signOut, useSession, initSession } from "@/lib/auth/session";
import { toggleTheme, useTheme, initTheme } from "@/lib/theme";
import { LANGS, setLang, useLang, useT, type Lang, initLang } from "@/lib/i18n";
import { commsStore, notifForRole, threadForRole, useComms } from "@/lib/comms-store";
import { logAction } from "@/lib/audit-log";
import type { Role } from "@/lib/auth/roles";

type IconComponent = ComponentType<{ className?: string }>;

export type SidebarItem = {
  href: string;
  label: string;
  icon: IconComponent;
  badge?: number;
};

export type SidebarGroup = {
  title?: string;
  items: SidebarItem[];
};

export type DashboardShellProps = {
  role: Role;
  brandLabel: string;
  brandIcon: IconComponent;
  groups: SidebarGroup[];
  quickActionLabel?: string;
  quickActionHref?: string;
  quickActionIcon?: IconComponent;
  searchPlaceholder?: string;
  children: React.ReactNode;
};

type Filter = "all" | "mine" | "unread";

export function DashboardShell({
  role, brandLabel, brandIcon: BrandIcon, groups,
  quickActionLabel, quickActionHref, quickActionIcon: QAIcon,
  searchPlaceholder = "Search…", children,
}: DashboardShellProps) {
  const session = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { initSession(); initTheme(); initLang(); }, []);

  const allItems = groups.flatMap((g) => g.items);

  function isActive(href: string) {
    if (href === `/${role}/dashboard`) return pathname === href;
    return pathname.startsWith(href);
  }

  function handleSignOut() {
    if (session) {
      logAction({
        actor: session.claims.name, actorId: session.claims.sub,
        role: session.claims.role, action: "signed_out",
      });
    }
    signOut();
    router.push("/auth/login");
  }

  return (
    <div className="flex min-h-dvh w-full bg-surface" data-role={role}>
      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BrandIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold leading-tight">{brandLabel}</div>
            <div className="truncate text-[11px] text-muted-foreground">{t("topbar.rscnPlatform")}</div>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col overflow-y-auto p-3 gap-4">
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.title && (
                <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.title}
                </div>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          active
                            ? "bg-primary font-medium text-primary-foreground"
                            : "text-muted-foreground hover:bg-surface hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge != null && item.badge > 0 && (
                          <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-danger-foreground">
                            {item.badge > 99 ? "99+" : item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="mt-auto">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>{t("topbar.signOut")}</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-border bg-background px-4 md:px-6">
          <button
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border"
            onClick={() => setSidebarOpen(true)}
            aria-label={t("topbar.openMenu")}
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder={searchPlaceholder}
              className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-1 ml-auto">
            {quickActionLabel && quickActionHref && QAIcon && (
              <Link
                href={quickActionHref}
                className="hidden lg:inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
              >
                <QAIcon className="h-4 w-4" /> {quickActionLabel}
              </Link>
            )}

            <LanguageMenu />

            <button
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-surface"
              onClick={() => toggleTheme()}
              aria-label={t("topbar.theme")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <NotifMenu role={role} />
            <MsgMenu role={role} />
            <UserMenu onSignOut={handleSignOut} onSwitch={() => router.push("/auth/login")} />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 min-w-0 pb-16 lg:pb-0">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <MobileBottomNav items={allItems.slice(0, 5)} isActive={isActive} />
      </div>
    </div>
  );
}

/* ── Mobile bottom nav ── */
function MobileBottomNav({ items, isActive }: { items: SidebarItem[]; isActive: (h: string) => boolean }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex h-14 items-stretch border-t border-border bg-background lg:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <span className="relative">
              <Icon className="h-5 w-5" />
              {item.badge != null && item.badge > 0 && (
                <span className="absolute -right-1.5 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-danger-foreground">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </span>
            <span className="truncate max-w-14">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/* ── Language menu ── */
function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const ref = useOutsideClose(() => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-surface" onClick={() => setOpen((v) => !v)}>
        <Globe className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-40 rounded-xl border border-border bg-background p-1 shadow-lg">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code as Lang); setOpen(false); }}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-surface"
            >
              {l.label}
              {lang === l.code && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Notifications ── */
function NotifMenu({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("mine");
  const notifications = useComms((s) => s.notifications);
  const ref = useOutsideClose(() => setOpen(false));
  const t = useT();

  const filtered = notifications.filter((n) => {
    if (filter === "mine") return notifForRole(n, role);
    if (filter === "unread") return !n.read && notifForRole(n, role);
    return true;
  });
  const unread = notifications.filter((n) => !n.read && notifForRole(n, role)).length;

  return (
    <div className="relative" ref={ref}>
      <button className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-surface" onClick={() => setOpen((v) => !v)}>
        <Bell className="h-4 w-4" />
        {unread > 0 && <UnreadBadge count={unread} />}
      </button>
      {open && (
        <DropPanel>
          <DropHeader title={t("topbar.notifications")} action={
            <button onClick={() => commsStore.markAllRead(role)} className="text-xs text-primary hover:underline">
              {t("topbar.markAllRead")}
            </button>
          } />
          <FilterBar value={filter} onChange={setFilter} />
          <ul className="max-h-72 divide-y divide-border overflow-y-auto">
            {filtered.length === 0 && <li className="p-5 text-center text-sm text-muted-foreground">{t("topbar.noItems")}</li>}
            {filtered.slice(0, 20).map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => commsStore.markRead(n.id)}
                  className={`flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-surface ${n.read ? "opacity-60" : ""}`}
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneCls(n.tone)}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{n.message}</span>
                    <span className="text-[11px] text-muted-foreground">{n.category} · {n.time}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-2">
            <Link href={`/${role}/notifications`} onClick={() => setOpen(false)} className="block w-full rounded-md px-3 py-2 text-center text-xs font-medium text-primary hover:bg-surface">
              {t("topbar.viewAll")}
            </Link>
          </div>
        </DropPanel>
      )}
    </div>
  );
}

/* ── Messages ── */
function MsgMenu({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("mine");
  const threads = useComms((s) => s.threads);
  const ref = useOutsideClose(() => setOpen(false));
  const t = useT();

  const filtered = threads.filter((th) => {
    if (filter === "mine") return threadForRole(th, role);
    if (filter === "unread") return th.unread > 0 && threadForRole(th, role);
    return true;
  });
  const unread = threads.filter((th) => threadForRole(th, role)).reduce((a, th) => a + th.unread, 0);

  return (
    <div className="relative" ref={ref}>
      <button className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-surface" onClick={() => setOpen((v) => !v)}>
        <MessageSquare className="h-4 w-4" />
        {unread > 0 && <UnreadBadge count={unread} />}
      </button>
      {open && (
        <DropPanel>
          <DropHeader title={t("topbar.messages")} />
          <FilterBar value={filter} onChange={setFilter} />
          <ul className="max-h-72 divide-y divide-border overflow-y-auto">
            {filtered.length === 0 && <li className="p-5 text-center text-sm text-muted-foreground">{t("topbar.noItems")}</li>}
            {filtered.map((th) => {
              const last = th.messages[th.messages.length - 1];
              return (
                <li key={th.id}>
                  <button
                    onClick={() => { commsStore.markThreadRead(th.id); setOpen(false); }}
                    className="flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-surface"
                  >
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {th.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium">{th.name}</span>
                        <span className="text-[11px] text-muted-foreground">{th.time}</span>
                      </div>
                      <div className="truncate text-xs text-muted-foreground">{last?.text}</div>
                    </div>
                    {th.unread > 0 && (
                      <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        {th.unread}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border p-2">
            <Link href={`/${role}/messages`} onClick={() => setOpen(false)} className="block w-full rounded-md px-3 py-2 text-center text-xs font-medium text-primary hover:bg-surface">
              {t("topbar.viewAll")}
            </Link>
          </div>
        </DropPanel>
      )}
    </div>
  );
}

/* ── User menu ── */
function UserMenu({ onSignOut, onSwitch }: { onSignOut: () => void; onSwitch: () => void }) {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));
  const t = useT();
  const name = session?.claims.name ?? "Guest";
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-lg border border-border px-2 py-1 hover:bg-surface">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">{initials}</div>
        <div className="hidden text-left md:block">
          <div className="text-xs font-semibold leading-tight">{name}</div>
          <div className="text-[11px] leading-tight text-muted-foreground capitalize">{session?.claims.role?.replace("_", " ")}</div>
        </div>
        <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground md:block" />
      </button>
      {open && (
        <DropPanel width="w-52">
          <div className="border-b border-border px-3 py-2.5 text-xs text-muted-foreground">
            {t("topbar.signedInAs")}<br /><span className="font-medium text-foreground">{session?.claims.email}</span>
          </div>
          <div className="p-1">
            <button onClick={() => { setOpen(false); onSwitch(); }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-surface">
              <RefreshCw className="h-4 w-4" /> {t("topbar.switchAccount")}
            </button>
            <button onClick={() => { setOpen(false); onSignOut(); }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger hover:bg-danger/10">
              <LogOut className="h-4 w-4" /> {t("topbar.signOut")}
            </button>
          </div>
        </DropPanel>
      )}
    </div>
  );
}

/* ── Shared primitives ── */
function DropPanel({ children, width = "w-80" }: { children: React.ReactNode; width?: string }) {
  return (
    <div className={`absolute right-0 top-full z-30 mt-1 ${width} max-w-[92vw] rounded-xl border border-border bg-background shadow-lg`}>
      {children}
    </div>
  );
}

function DropHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
      <span className="text-sm font-semibold">{title}</span>
      {action}
    </div>
  );
}

function FilterBar({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  const t = useT();
  return (
    <div className="flex gap-1 border-b border-border px-2 py-1.5">
      {(["mine", "unread", "all"] as Filter[]).map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium ${value === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface"}`}
        >
          {f === "mine" ? t("topbar.filter.mine") : f === "unread" ? t("topbar.filter.unread") : t("topbar.filter.all")}
        </button>
      ))}
    </div>
  );
}

function UnreadBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold leading-4 text-danger-foreground">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function toneCls(tone: string) {
  return tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : tone === "danger" ? "bg-danger" : "bg-primary";
}

function useOutsideClose(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}
