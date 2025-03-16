import { db } from "@/app/db/db";
import { contacts, debts, paymentInfos } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import DebtTable from "../../debts/debt-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PaymentInfoCard from "./payment-info-card";
import NoItems from "@/components/ui/no-items";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contact = (
    await db.select().from(contacts).where(eq(contacts.id, id))
  )[0];

  const debtsResults = await db
    .select()
    .from(debts)
    .where(eq(debts.contactId, id));

  const paymentInfoResults = await db
    .select({ paymentInfo: paymentInfos })
    .from(paymentInfos)
    .innerJoin(contacts, eq(paymentInfos.contactId, contacts.id))
    .where(eq(contacts.id, id));

  return (
    <div className="flex flex-col justify-between">
      <h1 className="text-2xl font-bold">Contacts</h1>
      <div className="flex flex-col gap-y-4 pt-4">
        <h2 className="text-xl">
          {contact.firstName} {contact.lastName}
        </h2>
        <section>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Debts</h2>
          </div>
          <DebtTable
            results={debtsResults.map((debt) => ({ debt, contact }))}
          />
        </section>
        <section>
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Payment Information</h2>
            <Link href={`/contacts/${id}/payment-info/create`}>
              <Button className="hover:cursor-pointer" size="icon">
                <Plus />
              </Button>
            </Link>
          </div>
          {paymentInfoResults.length > 0 ? (
            paymentInfoResults.map(({ paymentInfo }) => (
              <PaymentInfoCard key={paymentInfo.id} paymentInfo={paymentInfo} />
            ))
          ) : (
            <NoItems />
          )}
        </section>
      </div>
    </div>
  );
}
