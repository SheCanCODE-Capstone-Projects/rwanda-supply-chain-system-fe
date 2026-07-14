import { Clock } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";

type ComingSoonProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function ComingSoon({
  title = "Coming soon",
  description = "This area is being prepared and will be available soon.",
  className,
}: ComingSoonProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={<Clock className="h-8 w-8" aria-hidden="true" />}
      className={className}
    />
  );
}
