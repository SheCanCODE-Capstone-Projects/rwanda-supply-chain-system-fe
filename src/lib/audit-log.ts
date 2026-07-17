"use client";
import { useSyncExternalStore } from "react";
import { Role } from "./auth/roles";

export type AuditEntry = {
  id: string; ts: number; actor: string; actorId: string;
  role: Role | "anonymous"; action: string; resource?: string;
  meta?: Record<string, string | number | boolean>;
};

const MAX = 500;
const STORAGE_KEY = "rscn.audit.v1";
let entries: AuditEntry[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function persistEntries() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function hydrateEntries() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) entries = JSON.parse(raw) as AuditEntry[];
  } catch {
    entries = [];
  }
}

hydrateEntries();

export function logAction(input: Omit<AuditEntry, "id" | "ts">) {
  const entry: AuditEntry = {
    ...input,
    id: `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    ts: Date.now(),
  };
  entries = [entry, ...entries].slice(0, MAX);
  persistEntries();
  emit();
}

export function clearAudit() { entries = []; persistEntries(); emit(); }
export function getAudit(): AuditEntry[] { return entries; }

export async function loadAuditFromServer(_limit = 200): Promise<void> {
  hydrateEntries();
  return;
}

export function useAudit(): AuditEntry[] {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => entries,
    () => [],
  );
}
