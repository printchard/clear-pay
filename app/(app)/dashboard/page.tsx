import { db } from "@/db/db";
import { contacts, debts, users } from "@/db/schema";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/actions/auth";
import dayjs from "dayjs";
import { and, desc, eq, gte, sql, sum } from "drizzle-orm";
import DashboardChart from "./dashboard-chart";

export default async function Page() {
  const session = await getSession();
  const borrowedResult = await db
    .select({ owed: sum(debts.amount) })
    .from(debts)
    .innerJoin(contacts, eq(debts.contactId, contacts.id))
    .where(
      and(
        gte(debts.createdAt, dayjs().startOf("month").toDate()),
        eq(contacts.userId, session!.id),
      ),
    );

  const mostOwedResult = await db
    .select({ contact: contacts })
    .from(contacts)
    .innerJoin(debts, eq(contacts.id, debts.contactId))
    .groupBy(contacts.id)
    .orderBy(desc(sum(debts.amount)))
    .where(eq(contacts.userId, session!.id))
    .limit(1);

  const dateTruncated = sql`DATE(${debts.createdAt})`;

  const chartResult = await db
    .select({
      date: dateTruncated.mapWith(String),
      amount: sum(debts.amount).mapWith(Number),
    })
    .from(debts)
    .innerJoin(contacts, eq(debts.contactId, contacts.id))
    .innerJoin(users, eq(contacts.userId, users.id))
    .where(eq(users.id, session!.id))
    .groupBy(dateTruncated);

  return (
    <div className="overflow-y-autom mb-4 grid h-full grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3">
      <Card className="row-span-1 p-4 md:col-span-2 lg:row-span-2">
        <CardTitle className="text-xl">All debt</CardTitle>
        <CardContent className="my-auto">
          {chartResult.length > 0 ? (
            <DashboardChart
              data={chartResult.map((result) => ({
                ...result,
                date: dayjs(result.date).format("DD/MM"),
              }))}
            />
          ) : (
            <p className="text-center text-2xl font-semibold">
              Add some debt to see the chart!
            </p>
          )}
        </CardContent>
      </Card>
      <Card className="min-h-40 p-4">
        <CardTitle className="text-xl">
          Borrowed in {dayjs().format("MMMM")}
        </CardTitle>
        <CardContent className="flex h-full items-center justify-center">
          <p className="text-center text-3xl">${borrowedResult[0].owed ?? 0}</p>
        </CardContent>
      </Card>
      <Card className="min-h-40 p-4">
        <CardTitle className="text-xl">Most Owed Contact</CardTitle>
        <CardContent className="flex h-full items-center justify-center">
          <p className="text-center text-3xl">
            {mostOwedResult.length > 0
              ? mostOwedResult[0].contact.firstName +
                " " +
                mostOwedResult[0].contact.lastName
              : "No contacts"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
