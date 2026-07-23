import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-normal transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:   "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border border-border bg-card text-foreground hover:bg-muted",
        outline:   "border border-primary bg-transparent text-primary hover:bg-primary/10",
        ghost:     "bg-transparent text-foreground hover:bg-muted",
        danger:    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link:      "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-sm rounded-xl",
        lg: "h-12 px-8 text-base rounded-xl font-semibold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
