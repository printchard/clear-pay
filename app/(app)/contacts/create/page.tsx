import { addContact } from "@/lib/actions";
import ConctactsForm from "./contacts-form";
import { getServerSession } from "next-auth";
import { db } from "@/app/db/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const session = await getServerSession();
  const { id: userId } = (
    await db.select().from(users).where(eq(users.email, session!.user!.email!))
  )[0];
  const formAction = addContact.bind(null, userId);
  return <ConctactsForm action={formAction} />;
}
