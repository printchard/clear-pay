"use client";

import { PaymentInfo } from "@/app/db/schema";
import PaymentInfoCard from "./payment-info-card";
import NoItems from "@/components/ui/no-items";
import DeleteDialog from "@/components/ui/delete-dialog";
import { deletePaymentInfo } from "@/lib/actions/paymentInfos";
import { useState } from "react";

export default function PaymentInfoSection({
  results,
}: {
  results: { paymentInfo: PaymentInfo }[];
}) {
  const [id, setId] = useState<string>("");

  const action = deletePaymentInfo.bind(null, id);

  if (results.length === 0) {
    return <NoItems />;
  }

  return (
    <DeleteDialog
      action={action}
      title="Are you sure you want to delete this payment info?"
      description="This action is irreversible"
    >
      <div className="mt-4 grid grid-cols-1 gap-4 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3">
        {results.map(({ paymentInfo }) => (
          <PaymentInfoCard
            key={paymentInfo.id}
            paymentInfo={paymentInfo}
            setId={setId}
          />
        ))}
      </div>
    </DeleteDialog>
  );
}
