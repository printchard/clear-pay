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
      <Label htmlFor="firstName">First Name</Label>
      <Input type="text" name="firstName" placeholder="First Name" />
      <Label htmlFor="lastName">Last Name</Label>
      <Input type="text" name="lastName" placeholder="Last Name" />
      <Button>Submit</Button>
    </form>
  );
}
