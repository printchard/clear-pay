"use client";

import { Contact, Debt } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { createDebt, updateDebt } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

function getAction(edit: boolean, debtId?: string) {
  if (edit) return updateDebt.bind(null, debtId!);
  return createDebt;
}

export default function DebtForm({
  debt,
  contacts,
  edit,
}: {
  debt?: Debt;
  edit?: boolean;
  contacts: Contact[];
}) {
  const [error, formAction] = useActionState(
    getAction(edit ?? false, debt?.id),
    {},
  );
  const [contactId, setContactId] = useState(debt?.contactId);
  const [status, setStatus] = useState<string | undefined>(
    debt?.status as string | undefined,
  );
  const router = useRouter();

  return (
    <Card className="p-4">
      <form className="flex flex-col gap-y-4" action={formAction}>
        <Label>Amount</Label>
        <Input type="number" name="amount" defaultValue={debt?.amount}></Input>
        <ErrorMessage error={error.amount?.at(0)} />
        <Label>Status</Label>
        <Select
          name="status"
          value={status}
          onValueChange={setStatus}
          key={status}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select the status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ErrorMessage error={error.status?.at(0)} />
        <Label>Contact</Label>
        <Select
          name="contactId"
          value={contactId}
          onValueChange={setContactId}
          key={contactId}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select the contact" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Contact</SelectLabel>
              {contacts.map((contact) => (
                <SelectItem key={contact.id} value={contact.id}>
                  {contact.firstName} {contact.lastName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ErrorMessage error={error.contactId?.at(0)} />
        <div className="flex w-full flex-row gap-4">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}
