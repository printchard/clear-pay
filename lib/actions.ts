"use server";

import { db } from "@/app/db/db";
import { contacts, debts, statusEnum } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
