"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { ButtonProps } from "./Button.types";
import { buttonVariants } from "./Button.styles";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, loading, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? "Loading..." : children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
