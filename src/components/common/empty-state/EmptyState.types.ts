import type { ReactNode } from "react";

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};
