import { createDebt } from "@/lib/actions";
import DebtForm from "../debt-form";
import { db } from "@/app/db/db";
import { contacts } from "@/app/db/schema";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { eq } from "drizzle-orm";

export default async function Page() {
  const session = await getServerSession(authConfig);
  const result = await db
    .select()
    .from(contacts)
    .where(eq(contacts.userId, session!.user!.id!));

  return <DebtForm contacts={result} />;
}
