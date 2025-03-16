import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import DebtTable from "./debt-table";
import { getServerSession } from "next-auth";
import { db } from "@/app/db/db";
import { contacts, debts, users } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const session = await getServerSession();
  const results = await db
    .select({ debt: debts, contact: contacts })
    .from(debts)
    .innerJoin(contacts, eq(debts.contactId, contacts.id))
    .innerJoin(users, eq(contacts.userId, users.id))
    .where(eq(users.email, session!.user!.email!))
    .orderBy(debts.createdAt);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Debts</h1>
        <Link href="/debts/create">
          <Button size="icon">
            <Plus />
          </Button>
        </Link>
      </div>
      <DebtTable results={results} />
    </>
  );
}
