"use server";

import { db } from "@/app/db/db";
import { users } from "@/app/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function createUser(formData: FormData) {
  const data = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      passwordConfirmation: z.string().min(8),
    })
    .parse(Object.fromEntries(formData));

  if (data.password !== data.passwordConfirmation) {
    return;
  }

  const hash = await bcrypt.hash(data.password, 10);
  try {
    await db.insert(users).values({ ...data, password: hash });
  } catch (e) {
    console.error(e);
  }
}
const updateUserPasswordSchema = z
  .object({
    currPassword: z
      .string()
      .min(8, { message: "Current password is required" }),
    newPassword: z.string().min(8, { message: "New password is required" }),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Confirmation password is required" }),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmNewPassword;
    },
    {
      message: "New password and confirmation do not match",
      path: ["confirmNewPassword"],
    },
  );
type UpdateUserPasswordFormErrors = z.inferFlattenedErrors<
  typeof updateUserPasswordSchema
>["fieldErrors"];

export async function updateUserPassword(
  userId: string,
  _: UpdateUserPasswordFormErrors,
  formData: FormData,
): Promise<UpdateUserPasswordFormErrors & { success?: boolean }> {
  const data = updateUserPasswordSchema.safeParse(Object.fromEntries(formData));

  if (!data.success) return data.error.flatten().fieldErrors;

  const { currPassword, newPassword } = data.data;
  const [user] = await db.select().from(users).where(eq(users.id, userId));

  if (!(await bcrypt.compare(currPassword, user.password))) {
    return {
      currPassword: ["Current password is incorrect"],
    };
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await db.update(users).set({ password: hash }).where(eq(users.id, userId));
  return {
    success: true,
  };
}
