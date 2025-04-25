import { db } from "@/db/db";
import { contacts, debts } from "@/db/schema";
import { getSession } from "@/lib/actions/auth";
import { eq } from "drizzle-orm";
import DebtForm from "../../debt-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  const debt = await db.select().from(debts).where(eq(debts.id, id)).limit(1);
  const result = await db
    .select()
    .from(contacts)
    .where(eq(contacts.userId, session!.id));

  return <DebtForm debt={debt[0]} contacts={result} edit />;
}
