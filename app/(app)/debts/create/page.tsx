import { authConfig } from "@/app/api/auth/[...nextauth]/authConfig";
import { db } from "@/app/db/db";
import { contacts } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import DebtForm from "../debt-form";

export default async function Page() {
  const session = await getServerSession(authConfig);
  const result = await db
    .select()
    .from(contacts)
    .where(eq(contacts.userId, session!.user!.id!));

  return <DebtForm contacts={result} />;
}
