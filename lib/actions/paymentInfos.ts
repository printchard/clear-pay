"use server";

import { db } from "@/app/db/db";
import { paymentInfoTypeEnum, paymentInfos } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const accountNumberSchema = z.string().regex(/^\d{10,12}$/);
export const clabeSchema = z.string().regex(/^\d{18}$/);
export const cardNumberSchema = z.string().regex(/^\d{16}$/);
const createPaymentInfoSchema = z
  .object({
    type: z.enum(paymentInfoTypeEnum.enumValues, {
      message: "Invalid payment info type",
    }),
    data: z.string(),
  })
  .superRefine((form, ctx) => {
    let errorMessage = "";
    switch (form.type) {
      case "clabe":
        if (!clabeSchema.safeParse(form.data).success) {
          errorMessage = "Invalid CLABE (must be 18 digits)";
        }
        break;
      case "cuenta":
        if (!accountNumberSchema.safeParse(form.data).success) {
          errorMessage = "Invalid account number (must be 10-12 digits)";
        }
        break;
      case "tarjeta":
        if (!cardNumberSchema.safeParse(form.data).success) {
          errorMessage = "Invalid card number (must be 16 digits)";
        }
        break;
    }

    if (errorMessage === "") return;
    ctx.addIssue({
      message: errorMessage,
      path: ["data"],
      code: "invalid_string",
      validation: "regex",
    });
  });

export type CreatePaymentInfoFormErrors = z.inferFlattenedErrors<
  typeof createPaymentInfoSchema
>["fieldErrors"];

export async function createPaymentInfo(
  contactId: string,
  _: CreatePaymentInfoFormErrors,
  formData: FormData,
) {
  const parsedData = createPaymentInfoSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!parsedData.success) return parsedData.error.flatten().fieldErrors;

  await db.insert(paymentInfos).values({ contactId, ...parsedData.data });
  revalidatePath(`/contacts/${contactId}/`);
  redirect(`/contacts/${contactId}/`);
}
const updatePaymentInfoSchema = createPaymentInfoSchema;

export type UpdatePaymentInfoFormErrors = CreatePaymentInfoFormErrors;

export async function updatePaymentInfo(
  id: string,
  contactId: string,
  _: UpdatePaymentInfoFormErrors,
  formData: FormData,
) {
  const parsedData = updatePaymentInfoSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!parsedData.success) return parsedData.error.flatten().fieldErrors;

  await db
    .update(paymentInfos)
    .set(parsedData.data)
    .where(eq(paymentInfos.id, id));

  revalidatePath(`/contacts/${contactId}/`);
  redirect(`/contacts/${contactId!}/`);
}

export async function deletePaymentInfo(id: string) {
  await db.delete(paymentInfos).where(eq(paymentInfos.id, id));
  revalidatePath("/contacts/[id]/", "page");
}
