import { Badge } from "@/components/ui/badge";
import { TransactionTypeEnum } from "@/db/schema";
import clsx from "clsx";

export type TransactionTypeBadgeProps = {
  transactionType: TransactionTypeEnum;
};

export default function TransactionTypeBadge({
  transactionType,
}: TransactionTypeBadgeProps) {
  return (
    <Badge
      className={clsx("w-20 hover:cursor-default", {
        "bg-orange-500": transactionType === "borrowed",
        "bg-sky-500": transactionType === "lent",
      })}
    >
      {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
    </Badge>
  );
}
