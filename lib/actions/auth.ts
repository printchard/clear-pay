"use server";

import { db } from "@/app/db/db";
import { users } from "@/app/db/schema";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { issueJWT, verifyJWT } from "../auth";

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFormErorrs = z.inferFlattenedErrors<
  typeof signInForm
>["fieldErrors"];

export async function signIn(
  callbackUrl: string,
  _: SignInFormErorrs,
  formData: FormData,
): Promise<SignInFormErorrs> {
  const parsedData = signInForm.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error.flatten().fieldErrors);
    return parsedData.error.flatten().fieldErrors;
  }

  const { email, password } = parsedData.data;

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    return { email: ["Invalid credentials"] };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { email: ["Invalid credentials"] };
  }

  const jwt = issueJWT(user);
  const cookieStore = await cookies();
  cookieStore.set("jwt", jwt, {
    expires: dayjs().add(1, "day").toDate(),
  });

  redirect(callbackUrl ? callbackUrl : "/dashboard");
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  redirect("/");
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token) {
    return null;
  }
  const decoded = verifyJWT(token);
  if (!decoded) {
    return null;
  }
  return decoded;
}
