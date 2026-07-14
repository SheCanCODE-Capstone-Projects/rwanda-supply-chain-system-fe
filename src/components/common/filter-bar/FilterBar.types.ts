import type { ReactNode } from "react";

export type FilterBarProps = {
  search?: ReactNode;
  filters?: ReactNode;
  actions?: ReactNode;
  className?: string;
};
