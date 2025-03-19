import { db } from "@/app/db/db";
import { contacts } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import ConctactsForm from "../../contacts-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = (
    await db.select().from(contacts).where(eq(contacts.id, id))
  )[0];
  return <ConctactsForm contact={contact} edit />;
}
