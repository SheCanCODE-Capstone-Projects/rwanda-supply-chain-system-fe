import type { ReactNode } from "react";

export interface RoleCardProps {
  role: string;
  label: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: (role: string) => void;
}
