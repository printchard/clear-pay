"use client";

import { Contact } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addContact } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useActionState } from "react";

export default function ConctactsForm({ contact }: { contact?: Contact }) {
  const { data: session, status } = useSession();
  const [error, formAction] = useActionState(
    addContact.bind(null, session?.user?.id!),
    {}
  );

  if (status === "loading") return <div>Loading...</div>;

  return (
    <form action={formAction} className="flex flex-col gap-y-4">
      <Label htmlFor="firstName">First Name</Label>
      <Input
        type="text"
        name="firstName"
        placeholder="First Name"
        defaultValue={contact?.firstName}
      />
      <ErrorMessage error={error?.firstName?.at(0)} />
      <Label htmlFor="lastName">Last Name</Label>
      <Input
        type="text"
        name="lastName"
        placeholder="Last Name"
        defaultValue={contact?.lastName ?? undefined}
      />
      <Button>Submit</Button>
      <ErrorMessage error={error?.lastName?.at(0)} />
    </form>
  );
}
