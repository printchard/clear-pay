"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { z } from "zod";

export type SigninFormProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function SigninForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/dashboard";
  const session = useSession();
  const [error, setError] = useState<string | null>(null);

  if (session.status === "authenticated") redirect(callbackUrl);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
      })
      .parse(Object.fromEntries(new FormData(e.currentTarget)));
    const result = await signIn("credentials", { ...form, redirect: false });

    if (result?.ok) {
      redirect(callbackUrl);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  }

  return (
    <Card className="w-96 p-4">
      <h1 className="text-4xl font-bold">
        Clear <span className="text-primary">Pay</span>
      </h1>
      <h2 className="font-bold text-2xl">Sign in</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" placeholder="Email" />
        <Label htmlFor="email">Password</Label>
        <Input type="password" name="password" placeholder="Password" />
        <Button className="hover:cursor-pointer">Submit</Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div className="text-sm">
        <span>Are you new to the app?</span>
        <Link href="/auth/register">
          <Button variant="link">Register</Button>
        </Link>
      </div>
    </Card>
  );
}
