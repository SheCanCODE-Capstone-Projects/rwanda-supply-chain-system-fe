import type { ReactNode } from "react";

export type MetricCardProps = {
  label: string;
  value: ReactNode;
  change?: string;
  helpText?: string;
  icon?: ReactNode;
  className?: string;
};
