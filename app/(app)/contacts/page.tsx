import { authConfig } from "@/app/api/auth/[...nextauth]/authConfig";
import { db } from "@/app/db/db";
import { contacts, debts, users } from "@/app/db/schema";
import PrimaryButton from "@/components/ui/primary-button";
import { eq, sql, sum } from "drizzle-orm";
import { UserRoundPlus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ContactsTable from "./contacts-table";

export default async function Page() {
  const session = await getServerSession(authConfig);

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
    .where(eq(users.id, session!.user!.id!))
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
