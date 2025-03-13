import { db } from "@/app/db/db";
import { contacts, Debt, users } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function DebtForm({
  action,
  debt,
}: {
  action: (formData: FormData) => void;
  debt?: Debt;
}) {
  const session = await getServerSession();
  const results = await db
    .select({ contact: contacts })
    .from(contacts)
    .innerJoin(users, eq(contacts.userId, users.id))
    .where(eq(users.email, session!.user!.email!));

  return (
    <Card className="p-4">
      <form className="flex flex-col gap-y-4" action={action}>
        <Label>Amount</Label>
        <Input
          type="number"
          min={0}
          name="amount"
          defaultValue={debt?.amount}
        ></Input>
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
        <Label>Contact</Label>
        <Select name="contactId" defaultValue={debt?.contactId}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select the contact" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Contact</SelectLabel>
              {results.map(({ contact }) => (
                <SelectItem key={contact.id} value={contact.id}>
                  {contact.firstName} {contact.lastName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>Submit</Button>
      </form>
    </Card>
  );
}
