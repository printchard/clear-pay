"use server";

import { db } from "@/app/db/db";
import { contacts } from "@/app/db/schema";
import { eq } from "drizzle-orm";
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
  formData: FormData,
) {
  const parsedData = createContactSchema.safeParse(
    Object.fromEntries(formData ? formData.entries() : []),
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
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be at most 50 characters" }),
  lastName: z.string().optional(),
});

export type UpdateContactFormErrors = z.inferFlattenedErrors<
  typeof updateContactSchema
>["fieldErrors"];

export async function updateContact(
  contactId: string,
  _: UpdateContactFormErrors,
  formData: FormData,
) {
  const parsedData = updateContactSchema.safeParse(
    Object.fromEntries(formData),
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
