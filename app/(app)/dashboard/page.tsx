import { db } from "@/app/db/db";
import { contacts, debts, users } from "@/app/db/schema";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import { gte, sum, eq, desc, and } from "drizzle-orm";
import DashboardChart from "./dashboard-chart";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = (await getServerSession(authConfig))!;
  const borrowedResult = await db
    .select({ owed: sum(debts.amount) })
    .from(debts)
    .innerJoin(contacts, eq(debts.contactId, contacts.id))
    .where(
      and(
        gte(debts.createdAt, dayjs().startOf("month").toDate()),
        eq(contacts.userId, session.user!.id!)
      )
    );

  const mostOwedResult = await db
    .select({ contact: contacts })
    .from(contacts)
    .innerJoin(debts, eq(contacts.id, debts.contactId))
    .groupBy(contacts.id)
    .orderBy(desc(sum(debts.amount)))
    .where(eq(contacts.userId, session.user!.id!))
    .limit(1);

  const chartResult = await db
    .select({ date: debts.createdAt, amount: debts.amount })
    .from(debts)
    .innerJoin(contacts, eq(debts.contactId, contacts.id))
    .innerJoin(users, eq(contacts.userId, users.id))
    .where(eq(users.id, session.user!.id!));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 h-full gap-2 p-2">
      <Card className="col-span-2 row-span-2 p-4">
        <CardTitle className="text-xl">All debt</CardTitle>
        <CardContent className="my-auto">
          <DashboardChart
            data={chartResult.map((result) => ({
              ...result,
              date: dayjs(result.date).format("DD/MM"),
            }))}
          />
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardTitle className="text-xl">
          Borrowed in {dayjs().format("MMMM")}
        </CardTitle>
        <CardContent className="flex justify-center items-center h-full">
          <p className="text-3xl text-center">${borrowedResult[0].owed ?? 0}</p>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardTitle className="text-xl">Most Owed Contact</CardTitle>
        <CardContent className="flex justify-center items-center h-full">
          <p className="text-3xl text-center">
            {mostOwedResult[0].contact.firstName +
              " " +
              mostOwedResult[0].contact.lastName}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
