"use server";

import { db } from "@/app/db/db";
import { contacts, debts, statusEnum, users } from "@/app/db/schema";
import bcrypt from "bcrypt";
import { eq, Update } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createContactSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be at most 50 characters" }),
  lastName: z.string().optional(),
});

export type CreateContactFormErrors = z.inferFlattenedErrors<
  typeof createContactSchema
>["fieldErrors"];

export async function createContact(
  userId: string,
  _: CreateContactFormErrors,
  formData: FormData
) {
  const parsedData = createContactSchema.safeParse(
    Object.fromEntries(formData ? formData.entries() : [])
  );

  if (!parsedData.success) {
    return parsedData.error.flatten().fieldErrors;
  }

  await db.insert(contacts).values({
    userId,
    ...parsedData.data,
  });
  revalidatePath("/contacts");
  redirect("/contacts");
}

export async function deleteContact(contactId: string) {
  await db.delete(contacts).where(eq(contacts.id, contactId));
  revalidatePath("/contacts");
}

const updateContactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
});

export type UpdateContactFormErrors = z.inferFlattenedErrors<
  typeof updateContactSchema
>["fieldErrors"];

export async function updateContact(
  contactId: string,
  _: UpdateContactFormErrors,
  formData: FormData
) {
  const parsedData = updateContactSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!parsedData.success) {
    return parsedData.error.flatten().fieldErrors;
  }
  await db
    .update(contacts)
    .set(parsedData.data)
    .where(eq(contacts.id, contactId));

  revalidatePath("/contacts");
  redirect("/contacts");
}

const createDebtSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  status: z.enum(statusEnum.enumValues, {
    message: "Please select a valid status",
  }),
  contactId: z.string().uuid({ message: "Please select a valid contact" }),
});

export type CreateDebtFormErrors = z.inferFlattenedErrors<
  typeof createDebtSchema
>["fieldErrors"];

export async function createDebt(_: CreateDebtFormErrors, formData: FormData) {
  const parsedData = createDebtSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return parsedData.error.flatten().fieldErrors;
  }

  await db.insert(debts).values(parsedData.data);

  revalidatePath("/debts");
  redirect("/debts");
}

const updateDebtSchema = z.object({
  amount: z.coerce.number().min(1),
  status: z.enum(statusEnum.enumValues),
  contactId: z.string().uuid(),
});

export type UpdateDebtFormErrors = z.inferFlattenedErrors<
  typeof updateDebtSchema
>["fieldErrors"];

export async function updateDebt(
  debtId: string,
  _: UpdateDebtFormErrors,
  formData: FormData
) {
  const parsedData = updateDebtSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) return parsedData.error.flatten().fieldErrors;

  await db.update(debts).set(parsedData.data).where(eq(debts.id, debtId));

  revalidatePath("/debts");
  redirect("/debts");
}

export async function deleteDebt(debtId: string) {
  await db.delete(debts).where(eq(debts.id, debtId));
  revalidatePath("/debts");
}

export async function createUser(formData: FormData) {
  const data = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .parse(Object.fromEntries(formData));

  if (data.password !== data.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const hash = await bcrypt.hash(data.password, 10);
  await db.insert(users).values({ ...data, password: hash });
}
