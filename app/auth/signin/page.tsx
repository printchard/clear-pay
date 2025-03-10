import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page({
  action,
}: {
  action: (formData: FormData) => void;
}) {
  return (
    <main className="flex flex-row items-center justify-center h-screen">
      <Card className="w-96 p-4">
        <h1 className="text-4xl font-bold">
          Clear <span className="text-primary">Pay</span>
        </h1>
        <h2 className="font-bold text-2xl">Sign in</h2>
        <form action={action} className="flex flex-col gap-y-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="Email" />
          <Label htmlFor="email">Password</Label>
          <Input type="password" name="password" placeholder="Password" />
          <Button>Submit</Button>
        </form>
      </Card>
    </main>
  );
}
