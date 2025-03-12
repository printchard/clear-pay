import { Contact } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ConctactsForm({
  action,
  contact,
}: {
  action: (formData: FormData) => void;
  contact?: Contact;
}) {
  return (
    <form action={action} className="flex flex-col gap-y-4">
      <Label htmlFor="firstName">First Name</Label>
      <Input
        type="text"
        name="firstName"
        placeholder="First Name"
        defaultValue={contact?.firstName}
      />
      <Label htmlFor="lastName">Last Name</Label>
      <Input
        type="text"
        name="lastName"
        placeholder="Last Name"
        defaultValue={contact?.lastName ?? undefined}
      />
      <Button>Submit</Button>
    </form>
  );
}
