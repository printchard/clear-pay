import { StatusEnum } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export type StatusBadgeProps = {
  status: StatusEnum;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      className={clsx("w-20 hover:cursor-default", {
        "bg-yellow-500": status === "pending",
        "bg-primary": status === "paid",
      })}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
