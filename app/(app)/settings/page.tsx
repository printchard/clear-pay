import { authConfig } from "@/app/api/auth/[...nextauth]/authConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServerSession } from "next-auth";
import PasswordChangeForm from "./password-change-form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status: string }>;
}) {
  const session = await getServerSession(authConfig);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <section className="flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold">Profile details</h2>
        <form className="flex max-w-3xl flex-col gap-y-4">
          <Label>Name</Label>
          <Input defaultValue={session!.user!.name!} />
          <Label>Email</Label>
          <Input defaultValue={session!.user!.email!} />
          <Button className="max-w-40">Save</Button>
        </form>
      </section>
      <section className="flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold">Change password</h2>
        <PasswordChangeForm />
      </section>
    </>
  );
}
