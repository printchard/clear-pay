"use client";

import { Contact } from "@/db/schema";
import { useSession } from "@/components/session-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createContact, updateContact } from "@/lib/actions/contacts";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

function getAction(
  edit: boolean,
  contactId: string | undefined,
  userId: string,
) {
  if (edit) return updateContact.bind(null, contactId!);
  return createContact.bind(null, userId);
}

export default function ConctactsForm({
  contact,
  edit,
}: {
  contact?: Contact;
  edit?: boolean;
}) {
  const session = useSession();
  const [error, formAction] = useActionState(
    getAction(edit ?? false, contact?.id, session.id),
    {},
  );

  const router = useRouter();

  return (
    <Card className="p-4">
      <form action={formAction} className="flex flex-col gap-y-4">
        <fieldset className="flex flex-row gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              defaultValue={contact?.firstName}
            />
            <ErrorMessage error={error?.firstName?.at(0)} />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              defaultValue={contact?.lastName ?? undefined}
            />
          </div>
        </fieldset>
        <div className="flex flex-row gap-4">
          <Button
            className="flex-1"
            variant="secondary"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button className="flex-1" type="submit">
            Submit
          </Button>
        </div>
        <ErrorMessage error={error?.lastName?.at(0)} />
      </form>
    </Card>
  );
}
