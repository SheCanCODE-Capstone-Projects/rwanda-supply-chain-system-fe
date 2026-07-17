"use client";
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/utils";
import { Eye, EyeOff } from "lucide-react";
import type { SelectOption } from "@/types";

const inputBase = "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60";

// ─── FormField ────────────────────────────────────────────────────────────────
export function FormField({ label, hint, error, required, children }: {
  label: string; hint?: string; error?: string; required?: boolean; children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label}{required && <span className="ml-0.5 text-danger">*</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

// ─── TextInput ────────────────────────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { error?: boolean }
export function TextInput({ className, error, ...props }: InputProps) {
  return <input className={cn(inputBase, error && "border-danger focus:ring-danger", className)} {...props} />;
}

// ─── EmailInput ───────────────────────────────────────────────────────────────
export function EmailInput(props: InputProps) {
  return <TextInput type="email" autoComplete="email" placeholder="you@company.rw" {...props} />;
}

// ─── PhoneInput ───────────────────────────────────────────────────────────────
export function PhoneInput(props: InputProps) {
  return <TextInput type="tel" placeholder="+250 78..." {...props} />;
}

// ─── PasswordInput ────────────────────────────────────────────────────────────
export function PasswordInput({ className, error, ...props }: InputProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        className={cn(inputBase, "pr-10", error && "border-danger focus:ring-danger", className)}
        {...props}
      />
      <button type="button" onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

// ─── SelectField ─────────────────────────────────────────────────────────────
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]; placeholder?: string; error?: boolean;
}
export function SelectField({ options, placeholder, className, error, ...props }: SelectProps) {
  return (
    <select className={cn(inputBase, error && "border-danger focus:ring-danger", className)} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

// ─── TextareaField ────────────────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { error?: boolean }
export function TextareaField({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn("w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60", error && "border-danger focus:ring-danger", className)}
      {...props}
    />
  );
}

// ─── SearchField ─────────────────────────────────────────────────────────────
import { Search } from "lucide-react";
export function SearchField({ value, onChange, placeholder = "Search…", className }: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
