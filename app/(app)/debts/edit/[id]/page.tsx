import { createDebt, updateDebt } from "@/lib/actions";
import DebtForm from "../../debt-form";
import { db } from "@/app/db/db";
import { debts } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const debt = await db.select().from(debts).where(eq(debts.id, id)).limit(1);
  return <DebtForm action={updateDebt.bind(null, id)} debt={debt[0]} />;
}
