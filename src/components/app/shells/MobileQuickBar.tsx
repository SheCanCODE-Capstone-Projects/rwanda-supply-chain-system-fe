"use client";
import { useRouter } from "next/navigation";
import { Bell, Home, MessageSquare } from "lucide-react";
import { Role, ROLE_META } from "@/lib/auth/roles";
import { ROLE_CONFIG } from "./roleConfig";
import { logAction } from "@/lib/audit-log";
import { getSession } from "@/lib/auth/session";
import { notifForRole, threadForRole, useComms } from "@/lib/comms-store";
import { useT } from "@/lib/i18n";

/** Roles that get the mobile bottom quick-action bar (field / on-the-go roles). */
const MOBILE_ROLES: Role[] = ["farmer", "driver", "warehouse", "retailer"];

/**
 * Bottom-anchored quick-action bar surfaced on mobile for field roles.
 * Mirrors the desktop topbar dropdowns: home, two role quick-actions,
 * notifications and messages — each with a live unread badge scoped to the
 * signed-in role and drawn from the same shared comms store.
 */
export function MobileQuickBar({ role }: { role: Role }) {
  const router = useRouter();
  const meta = ROLE_META[role];
  const t = useT();
  const cfg = ROLE_CONFIG[role];
  const notifications = useComms((s) => s.notifications);
  const threads = useComms((s) => s.threads);

  if (!MOBILE_ROLES.includes(role)) return null;

  const unreadNotif = notifications.filter((n) => !n.read && notifForRole(n, role)).length;
  const unreadMsg = threads.filter((t) => threadForRole(t, role)).reduce((a, t) => a + t.unread, 0);

  function go(slug: string, action: string) {
    const s = getSession();
    logAction({
      actor: s?.claims.name ?? "guest",
      actorId: s?.claims.sub ?? "anonymous",
      role: (s?.claims.role ?? "anonymous") as Role | "anonymous",
      action: `mobile.${action}`,
      resource: slug ? `${meta.home}/${slug}` : meta.home,
    });
    router.push(slug ? `${meta.home}/${slug}` : meta.home);
  }

  const quicks = cfg.quickActions.slice(0, 2);

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-5">
        <BarItem icon={Home} label={t("nav.home")} onClick={() => go("", "home")} />
        {quicks.map((qa) => (
          <BarItem
            key={qa.label}
            icon={qa.icon}
            label={qa.label}
            onClick={() => go(qa.slug, `quick.${qa.slug || "home"}`)}
          />
        ))}
        <BarItem
          icon={Bell}
          label={t("topbar.notifications")}
          badge={unreadNotif}
          onClick={() => go("notifications", "notifications")}
        />
        <BarItem
          icon={MessageSquare}
          label={t("topbar.messages")}
          badge={unreadMsg}
          onClick={() => go("messages", "messages")}
        />
      </ul>
    </nav>
  );
}

function BarItem({
  icon: Icon, label, onClick, badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="relative flex min-h-14 w-full flex-col items-center justify-center gap-1 px-2 py-2 text-[11px] font-medium text-muted-foreground active:bg-surface"
        aria-label={badge ? `${label} (${badge} unread)` : label}
      >
        <span className="relative">
          <Icon className="h-5 w-5 text-primary" />
          {badge != null && badge > 0 && (
            <span className="absolute -right-2 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-4 text-danger-foreground">
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </span>
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}
