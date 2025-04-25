"use client";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateUserFormErrors } from "@/lib/actions/users";
import { useActionState } from "react";

export default function ProfileDetailsForm({
  name,
  email,
  action,
}: {
  name: string;
  email: string;
  action: (
    state: UpdateUserFormErrors,
    formData: FormData,
  ) => Promise<UpdateUserFormErrors & { success?: boolean }>;
}) {
  const [state, formAction] = useActionState(action, {});
  return (
    <form className="flex max-w-3xl flex-col gap-y-4" action={formAction}>
      <Label>Name</Label>
      <Input defaultValue={name} name="name" />
      <ErrorMessage error={state.name?.at(0)} />
      <Label>Email</Label>
      <Input defaultValue={email} name="email" type="email" />
      <ErrorMessage error={state.email?.at(0)} />
      {state.success && (
        <div className="text-primary text-sm">Details updated successfully</div>
      )}
      <Button className="max-w-40">Save</Button>
    </form>
  );
}
