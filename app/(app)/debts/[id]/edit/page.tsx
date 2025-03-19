import { createDebt, updateDebt } from "@/lib/actions";
import DebtForm from "../../debt-form";
import { db } from "@/app/db/db";
import { contacts, debts } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authConfig);
  const debt = await db.select().from(debts).where(eq(debts.id, id)).limit(1);
  const result = await db
    .select()
    .from(contacts)
    .where(eq(contacts.userId, session!.user!.id!));

  return <DebtForm debt={debt[0]} contacts={result} edit />;
}
