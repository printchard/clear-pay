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
import { useActionState } from "react";

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
    {}
  );

  return (
    <Card className="p-4">
      <form className="flex flex-col gap-y-4" action={formAction}>
        <Label>Amount</Label>
        <Input type="number" name="amount" defaultValue={debt?.amount}></Input>
        <ErrorMessage error={error.amount?.at(0)} />
        <Label>Status</Label>
        <Select name="status" defaultValue={debt?.status as string}>
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
        <Select name="contactId" defaultValue={debt?.contactId}>
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
        <Button>Submit</Button>
      </form>
    </Card>
  );
}
