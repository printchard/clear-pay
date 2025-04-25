"use client";

import { PaymentInfo } from "@/db/schema";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createPaymentInfo,
  updatePaymentInfo,
} from "@/lib/actions/paymentInfos";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useState } from "react";

function getAction(
  paymentInfo: PaymentInfo | undefined,
  id: string,
  pId: string,
) {
  if (paymentInfo) {
    return updatePaymentInfo.bind(null, pId, id);
  }
  return createPaymentInfo.bind(null, id);
}

export default function PaymentInfosForm({
  paymentInfo,
}: {
  paymentInfo?: PaymentInfo;
}) {
  const params = useParams();
  const router = useRouter();
  const [type, setType] = useState<string | undefined>(paymentInfo?.type);
  const [data, setData] = useState<string | undefined>(paymentInfo?.data ?? "");

  const [error, formAction] = useActionState(
    getAction(paymentInfo, params.id as string, params.pId as string),
    {},
  );

  return (
    <form className="flex flex-col gap-y-4" action={formAction}>
      <Label>Payment Information Type</Label>
      <Select value={type} name="type" onValueChange={setType} key={type}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select the type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Type</SelectLabel>
            <SelectItem value="clabe">CLABE</SelectItem>
            <SelectItem value="tarjeta">Card Number</SelectItem>
            <SelectItem value="cuenta">Account Number</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ErrorMessage error={error.type?.at(0)} />
      <Label>Payment Information</Label>
      <Input
        type="text"
        name="data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <ErrorMessage error={error.data?.at(0)} />
      <div className="flex gap-4">
        <Button
          className="flex-1"
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button className="flex-1" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
