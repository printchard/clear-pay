import { db } from "@/db/db";
import { contacts } from "@/db/schema";
import { getSession } from "@/lib/actions/auth";
import { eq } from "drizzle-orm";
import DebtForm from "../debt-form";

export default async function Page() {
  const session = await getSession();
  const result = await db
    .select()
    .from(contacts)
    .where(eq(contacts.userId, session!.id));

  return <DebtForm contacts={result} />;
}
