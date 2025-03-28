import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import PaymentInfoFormSkeleton from "./payment-info-form-skeleton";
import PaymentInfosForm from "./payment-infos-form";

export default async function Page() {
  return (
    <Card className="p-4">
      <Suspense fallback={<PaymentInfoFormSkeleton />}>
        <PaymentInfosForm />
      </Suspense>
    </Card>
  );
}
