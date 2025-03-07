"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ConctactsForm({
  action,
}: {
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex flex-col gap-y-4">
      <Label htmlFor="email">First Name</Label>
      <Input type="text" name="firstName" placeholder="First Name" />
      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" placeholder="Email" />
      <Button>Submit</Button>
    </form>
  );
}
