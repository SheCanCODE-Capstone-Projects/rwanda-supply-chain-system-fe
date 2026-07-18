import { NotificationMenu } from "../notification-menu";
import { UserMenu } from "../user-menu";

export function Topbar() {
  return (
    <header
      className="flex h-[var(--topbar-height)] shrink-0 items-center justify-between border-b border-[--border] bg-white px-6"
      role="banner"
    >
      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <input
            placeholder="Search…"
            aria-label="Search"
            className="h-9 w-64 rounded-xl border border-[--border] bg-[--surface] px-4 text-sm text-[--text] placeholder:text-[--text-muted] outline-none transition-colors focus:border-[--primary] focus:ring-2 focus:ring-[--primary]/10"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <NotificationMenu />
        <div className="h-6 w-px bg-[--border]" aria-hidden="true" />
        <UserMenu />
      </div>
    </header>
  );
}
