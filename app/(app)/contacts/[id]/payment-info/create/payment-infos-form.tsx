"use client";

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
import { createPaymentInfo } from "@/lib/actions";
import { useParams } from "next/navigation";
import { useActionState, useState } from "react";

export default function PaymentInfosForm() {
  const params = useParams();
  const [type, setType] = useState<string | undefined>(undefined);

  const [error, formAction] = useActionState(
    createPaymentInfo.bind(null, params.id as string),
    {}
  );
  return (
    <form
      className="flex flex-col gap-y-4"
      action={formAction}
      onSubmit={() => setType(undefined)}
    >
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
      <Input type="text" name="data" />
      <ErrorMessage error={error.data?.at(0)} />
      <Button>Submit</Button>
    </form>
  );
}
