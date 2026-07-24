"use client";
import { useSyncExternalStore } from "react";
import { Role } from "./auth/roles";

export type NotificationCategory = "Order" | "Warehouse" | "Payment" | "Transport" | "Marketplace" | "System";
export type Tone = "success" | "warning" | "danger" | "info" | "muted";

export type Notification = {
  id: string; message: string; category: NotificationCategory;
  tone: Tone; time: string; read: boolean; targetRoles?: Role[];
};

export type Message = { self: boolean; text: string; time: string };
export type Thread = {
  id: string; name: string; role: string; targetRoles?: Role[];
  time: string; unread: number; messages: Message[];
};

export type State = { notifications: Notification[]; threads: Thread[] };

const STORAGE_KEY = "rscn.comms.v1";

const initial: State = {
  notifications: [
    { id: "n1", message: "Order #ORD-1042 delivered to Musanze Coop", category: "Order", tone: "success", time: "5 min ago", read: false, targetRoles: ["cooperative","transport","buyer"] },
    { id: "n2", message: "Warehouse WH-05 reached 100% occupancy", category: "Warehouse", tone: "warning", time: "23 min ago", read: false, targetRoles: ["warehouse","super_admin","government"] },
    { id: "n3", message: "Payment RWF 4.2M pending from Kigali Retail", category: "Payment", tone: "warning", time: "1 h ago", read: false, targetRoles: ["retailer","bank","supplier"] },
    { id: "n4", message: "Vehicle KGL-284 delayed by 2 hours", category: "Transport", tone: "danger", time: "2 h ago", read: false, targetRoles: ["transport","driver","buyer"] },
    { id: "n5", message: "New RFQ from Rusizi Traders", category: "Marketplace", tone: "info", time: "4 h ago", read: true, targetRoles: ["supplier","manufacturer"] },
    { id: "n6", message: "Batch BT-2026-082 expiring in 30 days", category: "Warehouse", tone: "warning", time: "6 h ago", read: true, targetRoles: ["warehouse","farmer","cooperative"] },
    { id: "n7", message: "Driver P. Uwase completed 12 trips this week", category: "Transport", tone: "success", time: "yesterday", read: true, targetRoles: ["transport","driver"] },
    { id: "n8", message: "MINAGRI Q3 report is due next Friday", category: "System", tone: "info", time: "yesterday", read: true, targetRoles: ["government","super_admin"] },
    { id: "n9", message: "Payment PAY-1189 processed successfully", category: "Payment", tone: "success", time: "2 days ago", read: true, targetRoles: ["bank","farmer","supplier"] },
    { id: "n10", message: "New marketplace listing from Nyagatare Farm", category: "Marketplace", tone: "info", time: "2 days ago", read: true, targetRoles: ["buyer","manufacturer","retailer"] },
    { id: "n11", message: "Fleet insurance renewal in 15 days", category: "System", tone: "warning", time: "3 days ago", read: true, targetRoles: ["transport","super_admin"] },
    { id: "n12", message: "Order #ORD-1039 requires attention", category: "Order", tone: "danger", time: "3 days ago", read: true },
  ],
  threads: [
    { id: "t1", name: "Musanze Cooperative", role: "Cooperative", targetRoles: ["cooperative","farmer","buyer"], time: "2m", unread: 2, messages: [
      { self: false, text: "Truck loaded with 12 tons of maize, leaving WH-03.", time: "10:20" },
      { self: true, text: "Great — please share POD once delivered.", time: "10:22" },
      { self: false, text: "Will do. ETA 13:40.", time: "10:23" },
    ]},
    { id: "t2", name: "Kigali Retail Ltd", role: "Retailer", targetRoles: ["retailer","supplier"], time: "1h", unread: 0, messages: [
      { self: false, text: "Invoice received, thanks.", time: "09:15" },
    ]},
    { id: "t3", name: "MINAGRI · Peace", role: "Government", targetRoles: ["government","super_admin"], time: "3h", unread: 1, messages: [
      { self: false, text: "Please share Q3 export data.", time: "08:00" },
    ]},
    { id: "t4", name: "Bank of Kigali", role: "Financial", targetRoles: ["bank","farmer","supplier"], time: "yesterday", unread: 0, messages: [
      { self: false, text: "Payment PAY-1189 processing.", time: "Yesterday" },
    ]},
    { id: "t5", name: "Rusizi Trans", role: "Transport", targetRoles: ["transport","driver","buyer"], time: "yesterday", unread: 0, messages: [
      { self: false, text: "Confirmed pickup for Friday.", time: "Yesterday" },
    ]},
    { id: "t6", name: "Nyagatare Farm", role: "Farmer", targetRoles: ["farmer","cooperative","buyer"], time: "2d", unread: 3, messages: [
      { self: false, text: "New harvest ready — 45 tons of rice.", time: "Mon" },
      { self: false, text: "Requesting transport quote.", time: "Mon" },
      { self: false, text: "Also need warehouse space.", time: "Mon" },
    ]},
  ],
};

function hydrateState(): State {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {
    // fall back to seed data
  }
  return initial;
}

function persistState(next: State) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

let state: State = hydrateState();
const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }

export const commsStore = {
  getState: () => state,
  markRead: (id: string) => {
    state = { ...state, notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n) };
    persistState(state);
    emit();
  },
  markAllRead: (role?: Role) => {
    state = { ...state, notifications: state.notifications.map((n) =>
      !role || !n.targetRoles || n.targetRoles.includes(role) ? { ...n, read: true } : n
    )};
    persistState(state);
    emit();
  },
  markThreadRead: (id: string) => {
    state = { ...state, threads: state.threads.map((t) => t.id === id ? { ...t, unread: 0 } : t) };
    persistState(state);
    emit();
  },
  sendMessage: (threadId: string, text: string) => {
    if (!text.trim()) return;
    state = { ...state, threads: state.threads.map((t) => t.id === threadId ? {
      ...t, time: "now", messages: [...t.messages, { self: true, text, time: "now" }],
    } : t) };
    persistState(state);
    emit();
  },
};

// Module-level snapshot cache keyed by selector function reference.
// useSyncExternalStore requires getSnapshot to return a cached (stable) value
// when the underlying state hasn't changed, otherwise React throws an infinite
// loop warning because it sees a new reference on every call.
const snapshotCache = new WeakMap<
  (s: State) => unknown,
  { state: State; result: unknown }
>();

export function useComms<T>(selector: (s: State) => T): T {
  function getSnapshot(): T {
    const cached = snapshotCache.get(selector);
    if (cached && cached.state === state) {
      return cached.result as T;
    }
    const result = selector(state);
    snapshotCache.set(selector, { state, result });
    return result;
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => selector(initial));
}

export function notifForRole(n: Notification, role?: Role): boolean {
  if (!role) return true;
  return !n.targetRoles || n.targetRoles.length === 0 || n.targetRoles.includes(role);
}
export function threadForRole(t: Thread, role?: Role): boolean {
  if (!role) return true;
  return !t.targetRoles || t.targetRoles.length === 0 || t.targetRoles.includes(role);
}
