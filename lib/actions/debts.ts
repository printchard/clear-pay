"use server";

import { db } from "@/db/db";
import { debts, statusEnum, transactionTypeEnum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createDebtSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  status: z.enum(statusEnum.enumValues, {
    message: "Please select a valid status",
  }),
  contactId: z.string().uuid({ message: "Please select a valid contact" }),
  createdAt: z.coerce
    .date()
    .max(new Date(), { message: "Date must not be in the future" }),
  transactionType: z.enum(transactionTypeEnum.enumValues, {
    message: "Please select a valid transaction type",
  }),
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
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  status: z.enum(statusEnum.enumValues, {
    message: "Please select a valid status",
  }),
  contactId: z.string().uuid({ message: "Please select a valid contact" }),
  createdAt: z.coerce.date().max(new Date(), {
    message: "Date must not be in the future",
  }),
});

export type UpdateDebtFormErrors = z.inferFlattenedErrors<
  typeof updateDebtSchema
>["fieldErrors"];

export async function updateDebt(
  debtId: string,
  _: UpdateDebtFormErrors,
  formData: FormData,
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
