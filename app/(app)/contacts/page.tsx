import { db } from "@/db/db";
import { contacts, debts, users } from "@/db/schema";
import PrimaryButton from "@/components/ui/primary-button";
import { getSession } from "@/lib/actions/auth";
import { and, eq, ilike, or, sql, sum } from "drizzle-orm";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";
import ContactsTable from "./contacts-table";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ name: string | undefined }>;
}) {
  const session = await getSession();
  const { name } = await searchParams;
  const nameFilter = name
    ? or(
        ilike(contacts.firstName, `%${name}%`),
        ilike(contacts.lastName, `%${name}%`),
      )
    : undefined;

  const result = await db
    .select({
      contact: contacts,
      owed: sum(
        sql`CASE WHEN ${debts.status} = 'pending' THEN ${debts.amount} ELSE 0 END`,
      ),
    })
    .from(contacts)
    .innerJoin(users, eq(contacts.userId, users.id))
    .leftJoin(debts, eq(contacts.id, debts.contactId))
    .where(and(eq(users.id, session!.id), nameFilter))
    .groupBy(contacts.id)
    .orderBy(contacts.firstName);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link href="/contacts/create">
          <PrimaryButton icon={<UserRoundPlus />} text="New" />
        </Link>
      </div>
      <ContactsTable result={result} />
    </>
  );
}
