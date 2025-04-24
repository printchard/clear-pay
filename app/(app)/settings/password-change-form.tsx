"use client";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserPassword } from "@/lib/actions/users";
import { useSession } from "next-auth/react";
import { useActionState } from "react";

export default function PasswordChangeForm() {
  const session = useSession(); // Replace with actual user ID
  const [state, formAction] = useActionState(
    updateUserPassword.bind(null, session!.data!.user!.id!),
    {},
  );

  return (
    <form className="flex max-w-3xl flex-col gap-y-4" action={formAction}>
      <Label>Current Password</Label>
      <Input name="currPassword" type="password" />
      <ErrorMessage error={state?.currPassword?.at(0)} />
      <Label>New Password</Label>
      <Input name="newPassword" type="password" />
      <ErrorMessage error={state?.newPassword?.at(0)} />
      <Label>Confirm Password</Label>
      <Input name="confirmNewPassword" type="password" />
      <ErrorMessage error={state?.confirmNewPassword?.at(0)} />
      {state.success && (
        <div className="text-primary text-sm">
          Password updated successfully
        </div>
      )}
      <Button className="max-w-40">Save</Button>
    </form>
  );
}
