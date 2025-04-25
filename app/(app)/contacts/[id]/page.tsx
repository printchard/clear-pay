import { db } from "@/db/db";
import { contacts, debts, paymentInfos } from "@/db/schema";
import PrimaryButton from "@/components/ui/primary-button";
import { eq } from "drizzle-orm";
import { SquarePlus } from "lucide-react";
import Link from "next/link";
import DebtTable from "../../debts/debt-table";
import PaymentInfoSection from "./payment-info-section";

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
              <PrimaryButton icon={<SquarePlus />} text="New" />
            </Link>
          </div>
          <PaymentInfoSection results={paymentInfoResults} />
        </section>
      </div>
    </div>
  );
}
