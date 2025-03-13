"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

export default function RegisterForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const session = useSession();
  if (session.status === "authenticated") redirect("/dashboard");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await action(formData);
    const credentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
      })
      .parse(Object.fromEntries(formData));
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.ok) {
      redirect("/dashboard");
    }
  }

  return (
    <Card className="w-96 p-4">
      <h1 className="text-4xl font-bold">
        Clear <span className="text-primary">Pay</span>
      </h1>
      <h2 className="font-bold text-2xl">Register</h2>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input name="name" />
        <Label>Email</Label>
        <Input type="email" name="email" />
        <Label>Password</Label>
        <Input type="password" name="password" />
        <Label>Confirm Password</Label>
        <Input type="password" name="confirmPassword" />
        <Button>Register</Button>
      </form>
      <div className="text-sm">
        <span>Already have an account?</span>
        <Link href="/auth/signin">
          <Button variant="link">Log in</Button>
        </Link>
      </div>
    </Card>
  );
}
