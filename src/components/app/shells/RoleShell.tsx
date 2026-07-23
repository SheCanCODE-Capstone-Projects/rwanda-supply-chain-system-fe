"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell, ChevronDown, LogOut, Menu, MessageSquare, Search, Globe, Sun, Moon, Zap, RefreshCw, Check,
} from "lucide-react";
import { ROLE_META, type Role } from "@/lib/auth/roles";
import { getRoleIcon } from "@/components/auth/RoleIcon";
import { hasPermission } from "@/lib/auth/permissions";
import { signOut, useSession, initSession } from "@/lib/auth/session";
import { ROLE_CONFIG } from "./roleConfig";
import { toggleTheme, useTheme, initTheme } from "@/lib/theme";
import { LANGS, setLang, useLang, useT, type Lang, initLang } from "@/lib/i18n";
import { commsStore, notifForRole, threadForRole, useComms } from "@/lib/comms-store";
import { logAction } from "@/lib/audit-log";
import { MobileQuickBar } from "./MobileQuickBar";

type Filter = "all" | "mine" | "unread";

export function RoleShell({ role, children }: { role: Role; children: React.ReactNode }) {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const cfg = ROLE_CONFIG[role];
  const meta = ROLE_META[role];

  useEffect(() => { initSession(); initTheme(); initLang(); }, []);

  const activeSlug = (() => {
    const rest = pathname.replace(new RegExp(`^${meta.home}/?`), "");
    return rest.split("/")[0] || "";
  })();

  const navItems = cfg.nav.filter((n) => !n.perm || hasPermission(role, n.perm));

  function goTo(slug: string) {
    setOpen(false);
    router.push(slug ? `${meta.home}/${slug}` : meta.home);
  }

  const RoleIcon = getRoleIcon(role);

  return (
    <div className="flex min-h-dvh w-full bg-surface" data-role={role}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <RoleIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{cfg.brandLabel}</div>
            <div className="truncate text-[11px] text-muted-foreground">{t("topbar.rscnPlatform")} · {meta.short}</div>
          </div>
        </div>
        <nav className="flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto p-3">
          <div className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t("topbar.workspace")}
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.slug === activeSlug;
              return (
                <li key={item.slug || "index"}>
                  <button
                    onClick={() => goTo(item.slug)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      active
                        ? "bg-primary font-medium text-primary-foreground"
                        : "text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 rounded-lg border border-sidebar-border p-3 text-xs">
            <div className="mb-2 font-semibold text-foreground">{t("topbar.quickActions")}</div>
            <div className="grid grid-cols-2 gap-1.5">
              {cfg.quickActions.map((qa) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.label}
                    onClick={() => goTo(qa.slug)}
                    className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 text-left hover:bg-surface"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    <span className="truncate">{qa.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <button
              onClick={() => { signOut(); router.push("/auth/login"); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <LogOut className="h-4 w-4" /> {t("topbar.signOut")}
            </button>
          </div>
        </nav>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b border-border bg-background px-4 md:px-6">
          <button
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border"
            onClick={() => setOpen(true)}
            aria-label={t("topbar.openMenu")}
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="relative flex-1 max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder={`${t("topbar.search")} ${cfg.searchScope}`}
              className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* role/org pill */}
          <div
            className="hidden md:flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs"
            title={`${meta.label} · ${session?.claims.org ?? meta.orgType}`}
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-medium text-foreground">{meta.short}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground truncate max-w-30">
              {session?.claims.org ?? meta.orgType}
            </span>
          </div>

          {/* quick action */}
          {cfg.quickActions[0] && (
            <button
              onClick={() => {
                const qa = cfg.quickActions[0];
                logAction({
                  actor: session?.claims.name ?? "guest",
                  actorId: session?.claims.sub ?? "anonymous",
                  role: session?.claims.role ?? "anonymous",
                  action: `quick_action.${qa.slug || "home"}`,
                  resource: `${meta.home}/${qa.slug}`,
                });
                goTo(qa.slug);
              }}
              className="hidden lg:inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              <Zap className="h-4 w-4" /> {cfg.quickActions[0].label}
            </button>
          )}

          <LanguageMenu />
          <button
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-surface"
            aria-label={t("topbar.theme")}
            onClick={() => toggleTheme()}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <NotificationsMenu role={role} onView={() => goTo("notifications")} />
          <MessagesMenu role={role} onView={() => goTo("messages")} />

          <UserMenu onNavigate={(path) => router.push(path)} />
        </header>

        <div className="flex-1 min-w-0 pb-16 md:pb-0">
          {children}
        </div>

        <MobileQuickBar role={role} />
      </div>
    </div>
  );
}

/* ------------------------ Language menu ------------------------ */

function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const ref = useOutsideClose(() => setOpen(false));
  const t = useT();
  return (
    <div className="relative" ref={ref}>
      <button
        className="grid h-9 w-9 place-items-center rounded-lg hover:bg-surface"
        aria-label={t("topbar.language")}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-44 rounded-xl border border-border bg-background p-1 shadow-lg">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code as Lang); setOpen(false); }}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-surface"
            >
              <span>{l.label}</span>
              {lang === l.code && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------ Notifications ------------------------ */

function NotificationsMenu({ role, onView }: { role: Role; onView: () => void }) {
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
      <button
        className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-surface"
        aria-label={`${t("topbar.notifications")}${unread ? ` (${unread})` : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && <UnreadDot count={unread} />}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-88 max-w-[90vw] rounded-xl border border-border bg-background shadow-lg">
          <MenuHeader
            title={t("topbar.notifications")}
            action={
              <button
                onClick={() => commsStore.markAllRead(role)}
                className="text-xs font-medium text-primary hover:underline"
              >
                {t("topbar.markAllRead")}
              </button>
            }
          />
          <FilterTabs value={filter} onChange={setFilter} />
          <ul className="max-h-80 divide-y divide-border overflow-y-auto">
            {filtered.length === 0 && (
              <li className="p-6 text-center text-sm text-muted-foreground">{t("topbar.noItems")}</li>
            )}
            {filtered.slice(0, 30).map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => { commsStore.markRead(n.id); }}
                  className={`flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-surface ${n.read ? "opacity-70" : ""}`}
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot(n.tone)}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{n.message}</span>
                    <span className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{n.category}</span>·<span>{n.time}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-2">
            <button
              onClick={() => { setOpen(false); onView(); }}
              className="block w-full rounded-md px-3 py-2 text-center text-xs font-medium text-primary hover:bg-surface"
            >
              {t("topbar.viewAll")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------ Messages ------------------------ */

function MessagesMenu({ role, onView }: { role: Role; onView: () => void }) {
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
  const unread = threads
    .filter((th) => threadForRole(th, role))
    .reduce((a, th) => a + th.unread, 0);

  return (
    <div className="relative" ref={ref}>
      <button
        className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-surface"
        aria-label={`${t("topbar.messages")}${unread ? ` (${unread})` : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <MessageSquare className="h-4 w-4" />
        {unread > 0 && <UnreadDot count={unread} />}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-88 max-w-[90vw] rounded-xl border border-border bg-background shadow-lg">
          <MenuHeader title={t("topbar.messages")} />
          <FilterTabs value={filter} onChange={setFilter} />
          <ul className="max-h-80 divide-y divide-border overflow-y-auto">
            {filtered.length === 0 && (
              <li className="p-6 text-center text-sm text-muted-foreground">{t("topbar.noItems")}</li>
            )}
            {filtered.map((th) => {
              const last = th.messages[th.messages.length - 1];
              return (
                <li key={th.id}>
                  <button
                    onClick={() => { commsStore.markThreadRead(th.id); setOpen(false); onView(); }}
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
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{th.role}</div>
                    </div>
                    {th.unread > 0 && (
                      <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        {th.unread}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border p-2">
            <button
              onClick={() => { setOpen(false); onView(); }}
              className="block w-full rounded-md px-3 py-2 text-center text-xs font-medium text-primary hover:bg-surface"
            >
              {t("topbar.viewAll")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------ Small pieces ------------------------ */

function MenuHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-3 py-2">
      <div className="text-sm font-semibold">{title}</div>
      {action}
    </div>
  );
}

function FilterTabs({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  const t = useT();
  const tabs: { key: Filter; label: string }[] = [
    { key: "mine", label: t("topbar.filter.mine") },
    { key: "unread", label: t("topbar.filter.unread") },
    { key: "all", label: t("topbar.filter.all") },
  ];
  return (
    <div className="flex gap-1 border-b border-border px-2 py-1.5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium ${
            value === tab.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function UnreadDot({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-4 text-danger-foreground">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function toneDot(tone: string): string {
  switch (tone) {
    case "success": return "bg-success";
    case "warning": return "bg-warning";
    case "danger": return "bg-danger";
    case "info": return "bg-primary";
    default: return "bg-muted-foreground";
  }
}

function useOutsideClose(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);
  return ref;
}

/* ------------------------ User menu ------------------------ */

function UserMenu({ onNavigate }: { onNavigate: (path: string) => void }) {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));
  const t = useT();
  const name = session?.claims.name ?? t("common.guest");
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-border px-2 py-1 hover:bg-surface"
      >
        <div className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          {initials}
        </div>
        <div className="hidden text-left md:block">
          <div className="text-xs font-semibold leading-tight">{name}</div>
          <div className="text-[11px] leading-tight text-muted-foreground">
            {session ? session.claims.role.replace("_", " ") : t("common.signedOut")}
          </div>
        </div>
        <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-border bg-background p-2 shadow-lg">
          <div className="border-b border-border px-3 py-2 text-xs text-muted-foreground">
            {t("topbar.signedInAs")}<br /><span className="font-medium text-foreground">{session?.claims.email}</span>
          </div>
          <button
            onClick={() => { setOpen(false); onNavigate("/auth/login"); }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-surface"
          >
            <RefreshCw className="h-4 w-4" /> {t("topbar.switchAccount")}
          </button>
          <button
            onClick={() => { signOut(); onNavigate("/auth/login"); }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger hover:bg-danger/10"
          >
            <LogOut className="h-4 w-4" /> {t("topbar.signOut")}
          </button>
        </div>
      )}
    </div>
  );
}

