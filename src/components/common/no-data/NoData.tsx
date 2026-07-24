import { EmptyState } from "@/components/common/empty-state";

type NoDataProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function NoData({
  title = "No data",
  description = "There is nothing to display yet.",
  className,
}: NoDataProps) {
  return (
    <EmptyState title={title} description={description} className={className} />
  );
}
