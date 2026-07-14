import type { ReactNode } from "react";

export type StatCardTone = "neutral" | "success" | "warning" | "danger";

export type StatCardProps = {
  label: string;
  value: ReactNode;
  description?: string;
  trend?: string;
  icon?: ReactNode;
  tone?: StatCardTone;
  className?: string;
};
