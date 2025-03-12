import { db } from "@/app/db/db";
import { contacts, debts, users } from "@/app/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import StatusBadge from "./status-badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default async function DebtTable() {
  const session = await getServerSession();
  const results = await db
    .select({ debt: debts, contact: contacts })
    .from(debts)
    .innerJoin(contacts, eq(debts.contactId, contacts.id))
    .innerJoin(users, eq(contacts.userId, users.id))
    .where(eq(users.email, session!.user!.email!))
    .orderBy(debts.createdAt);

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead>Contact</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="w-30"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map(({ debt, contact }) => {
          return (
            <TableRow key={debt.id}>
              <TableCell>
                {contact.firstName} {contact.lastName}
              </TableCell>
              <TableCell>{`$ ${debt.amount}`}</TableCell>
              <TableCell>
                <StatusBadge status={debt.status!} />
              </TableCell>
              <TableCell>
                {dayjs(debt.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="flex justify-start gap-2">
                <Link href={`/debts/edit/${debt.id}`}>
                  <Button variant="secondary" size="icon">
                    <Pencil />
                  </Button>
                </Link>
                <Button variant="destructive" size="icon">
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
