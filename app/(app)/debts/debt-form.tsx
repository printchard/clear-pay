"use client";

import { Contact, Debt } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";
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
import { createDebt, updateDebt } from "@/lib/actions/debts";
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
  const [status, setStatus] = useState<string>(debt?.status ?? "pending");
  const [transactionType, setTrasactionType] = useState<string>(
    debt?.transactionType ?? "borrowed",
  );
  const [date, setDate] = useState<Date | undefined>(
    debt?.createdAt ?? new Date(),
  );
  const router = useRouter();

  return (
    <Card className="p-4">
      <form className="flex flex-col gap-y-4" action={formAction}>
        <section className="flex flex-row gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              defaultValue={debt?.amount}
            ></Input>
            <ErrorMessage error={error.amount?.at(0)} />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label>Created At</Label>
            <DatePicker date={date} setDate={setDate} name="createdAt" />
            <ErrorMessage error={error.createdAt?.at(0)} />
          </div>
        </section>
        <section className="flex flex-row gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <Label>Status</Label>
            <Select name="status" value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
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
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label>Contact</Label>
            <Select
              name="contactId"
              value={contactId}
              onValueChange={setContactId}
            >
              <SelectTrigger className="w-full">
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
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label>Transaction Type</Label>
            <Select
              name="transactionType"
              value={transactionType}
              onValueChange={setTrasactionType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select the transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Transaction Type</SelectLabel>
                  <SelectItem value="borrowed">Borrowed</SelectItem>
                  <SelectItem value="lent">Lent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>
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
