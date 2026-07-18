import * as React from "react";
import { cn } from "@/lib/utils";
import type { InputProps } from "./Input.types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[--text]">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[--border] bg-white px-4 py-2 text-sm text-[--text] shadow-sm transition-colors placeholder:text-[--text-muted] focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-[--danger] focus:ring-[--danger]",
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p role="alert" className="text-xs text-[--danger]">
          {error}
        </p>
      )}
    </div>
  ),
);
Input.displayName = "Input";

export { Input };
