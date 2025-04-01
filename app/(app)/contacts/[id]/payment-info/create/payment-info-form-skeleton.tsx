import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentInfoFormSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-48" />
    </div>
  );
}
