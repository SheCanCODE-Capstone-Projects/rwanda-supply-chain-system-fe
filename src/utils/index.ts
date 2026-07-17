import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Tone } from "@/types";
import { STATUS_TONE } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugToTitle(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function statusToTone(status: string): Tone {
  return (STATUS_TONE[status as keyof typeof STATUS_TONE] ?? "muted") as Tone;
}

export function formatCurrency(amount: number, currency = "RWF"): string {
  return `${currency} ${amount.toLocaleString()}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-RW", { day: "numeric", month: "short", year: "numeric" });
}

export function truncate(str: string, max = 40): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

export function initials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
