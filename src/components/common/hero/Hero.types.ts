import type { ReactNode } from "react";

export type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  media?: ReactNode;
  className?: string;
  contentClassName?: string;
};
