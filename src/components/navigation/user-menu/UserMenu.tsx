"use client";

import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserMenu() {
  const { currentUser, logout } = useAuth();

  const initials = currentUser?.name ? getInitials(currentUser.name) : "U";
  const displayName = currentUser?.name ?? "User";
  const displayRole = currentUser?.role
    ? currentUser.role.charAt(0) + currentUser.role.slice(1).toLowerCase()
    : "";

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback className="bg-[--primary] text-white text-xs font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="text-sm font-medium text-[--text] leading-tight">{displayName}</p>
        <p className="text-xs text-[--text-secondary]">{displayRole}</p>
      </div>
      <button
        type="button"
        onClick={() => void logout()}
        className="ml-1 rounded-lg px-3 py-1.5 text-xs font-medium text-[--text-secondary] hover:bg-[--surface-hover] hover:text-[--text] transition-colors"
        aria-label="Sign out"
      >
        Sign out
      </button>
    </div>
  );
}
