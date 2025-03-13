"use server";

import { db } from "@/app/db/db";
import { contacts, debts, statusEnum, users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function addContact(userId: string, formData: FormData) {
  const data = z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().optional(),
    })
    .parse(Object.fromEntries(formData));

  await db.insert(contacts).values({
    userId,
    ...data,
  });
  revalidatePath("/contacts");
  redirect("/contacts");
}

export async function deleteContact(contactId: string) {
  await db.delete(contacts).where(eq(contacts.id, contactId));
  revalidatePath("/contacts");
}

export async function updateContact(contactId: string, formData: FormData) {
  const data = z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().optional(),
    })
    .parse(Object.fromEntries(formData));
  console.log(data);
  await db.update(contacts).set(data).where(eq(contacts.id, contactId));

  revalidatePath("/contacts");
  redirect("/contacts");
}

export async function createDebt(formData: FormData) {
  const data = z
    .object({
      amount: z.coerce.number().min(0),
      status: z.enum(statusEnum.enumValues),
      contactId: z.string(),
    })
    .parse(Object.fromEntries(formData));

  await db.insert(debts).values(data);

  revalidatePath("/debts");
  redirect("/debts");
}

export async function updateDebt(debtId: string, formData: FormData) {
  const data = z
    .object({
      amount: z.coerce.number().min(0),
      status: z.enum(statusEnum.enumValues),
      contactId: z.string(),
    })
    .parse(Object.fromEntries(formData));

  await db.update(debts).set(data).where(eq(debts.id, debtId));

  revalidatePath("/debts");
  redirect("/debts");
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
