"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

export default function SigninForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "";
  const [errors, action] = useActionState(signIn.bind(null, callbackUrl), {});
  console.log(errors);

  return (
    <Card className="w-96 p-4">
      <h1 className="text-4xl font-bold">
        Clear <span className="text-primary">Pay</span>
      </h1>
      <h2 className="text-2xl font-bold">Sign in</h2>
      <form action={action} className="flex flex-col gap-y-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" placeholder="Email" />
        <Label htmlFor="email">Password</Label>
        <Input type="password" name="password" placeholder="Password" />
        <Button className="hover:cursor-pointer">Submit</Button>
      </form>
      {errors?.email && <p className="text-red-500">{errors.email[0]}</p>}
      <div className="text-sm">
        <span>Are you new to the app?</span>
        <Link href="/auth/register">
          <Button variant="link">Register</Button>
        </Link>
      </div>
    </Card>
  );
}
