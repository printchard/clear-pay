import { db } from "@/app/db/db";
import { contacts, debts, users } from "@/app/db/schema";
import PrimaryButton from "@/components/ui/primary-button";
import { desc, eq } from "drizzle-orm";
import { Landmark } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import DebtTable from "./debt-table";

export default async function Page() {
  const session = await getServerSession();
  const results = await db
    .select({ debt: debts, contact: contacts })
    .from(debts)
    .innerJoin(contacts, eq(debts.contactId, contacts.id))
    .innerJoin(users, eq(contacts.userId, users.id))
    .where(eq(users.email, session!.user!.email!))
    .orderBy(desc(debts.createdAt));

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Debts</h1>
        <Link href="/debts/create">
          <PrimaryButton icon={<Landmark />} text="New" />
        </Link>
      </div>
      <DebtTable results={results} />
    </>
  );
}
