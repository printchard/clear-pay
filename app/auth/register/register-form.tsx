"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export default function RegisterForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const session = useSession();
  const signInSchema = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      passwordConfirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      path: ["passwordConfirmation"],
      message: "Passwords do not match",
    });
  const [error, setError] = useState<
    z.inferFlattenedErrors<typeof signInSchema>["fieldErrors"]
  >({});
  if (session.status === "authenticated") redirect("/dashboard");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials = signInSchema.safeParse(Object.fromEntries(formData));

    if (!credentials.success) {
      setError(credentials.error.flatten().fieldErrors);
      return;
    }

    await action(formData);
    const result = await signIn("credentials", {
      ...credentials.data,
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
        <ErrorMessage error={error.name?.at(0)} />
        <Label>Email</Label>
        <Input type="email" name="email" />
        <ErrorMessage error={error.email?.at(0)} />
        <Label>Password</Label>
        <Input type="password" name="password" />
        <ErrorMessage error={error.password?.at(0)} />
        <Label>Confirm Password</Label>
        <Input type="password" name="passwordConfirmation" />
        <ErrorMessage error={error.passwordConfirmation?.at(0)} />
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
