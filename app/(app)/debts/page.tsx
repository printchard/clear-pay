import { db } from "@/db/db";
import { contacts, debts, parseStatusEnum, users } from "@/db/schema";
import PrimaryButton from "@/components/ui/primary-button";
import { getSession } from "@/lib/actions/auth";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { Landmark } from "lucide-react";
import Link from "next/link";
import DebtFilters from "./debt-filters";
import DebtTable from "./debt-table";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    name: string | undefined;
    status: string | undefined;
  }>;
}) {
  const session = await getSession();
  const { name, status } = await searchParams;

  const nameFilter = name
    ? or(
        ilike(contacts.firstName, `%${name}%`),
        ilike(contacts.lastName, `%${name}%`),
      )
    : undefined;

  const parsedStatus = parseStatusEnum(status ?? "");
  const statusFilter = parsedStatus
    ? eq(debts.status, parsedStatus)
    : undefined;

  const results = await db
    .select({ debt: debts, contact: contacts })
    .from(debts)
    .innerJoin(contacts, eq(debts.contactId, contacts.id))
    .innerJoin(users, eq(contacts.userId, users.id))
    .where(and(eq(users.id, session!.id), nameFilter, statusFilter))
    .orderBy(desc(debts.createdAt));

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Debts</h1>
        <Link href="/debts/create">
          <PrimaryButton icon={<Landmark />} text="New" />
        </Link>
      </div>
      <DebtFilters />
      <DebtTable results={results} />
    </>
  );
}
