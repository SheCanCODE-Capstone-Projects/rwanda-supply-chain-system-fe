import type { ReactNode } from "react";

export type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  meta?: string;
  className?: string;
};
