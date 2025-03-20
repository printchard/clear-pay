import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import PaymentInfosForm from "./payment-infos-form";

export default async function Page() {
  return (
    <Card className="p-4">
      <Suspense>
        <PaymentInfosForm />
      </Suspense>
    </Card>
  );
}
