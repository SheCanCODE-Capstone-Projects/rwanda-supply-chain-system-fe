import type { ReactNode } from "react";

export type RoleCardProps = {
  title: string;
  description: string;
  role: string;
  href?: string;
  icon?: ReactNode;
  ctaLabel?: string;
  className?: string;
};
