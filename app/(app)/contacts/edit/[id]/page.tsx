import { updateContact } from "@/lib/actions";
import ConctactsForm from "../../create/contacts-form";
import { db } from "@/app/db/db";
import { contacts } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = (
    await db.select().from(contacts).where(eq(contacts.id, id))
  )[0];
  return (
    <ConctactsForm action={updateContact.bind(null, id)} contact={contact} />
  );
}
