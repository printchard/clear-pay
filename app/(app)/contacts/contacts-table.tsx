"use server";

import { authConfig } from "@/app/api/auth/[...nextauth]/authConfig";
import { db } from "@/app/db/db";
import { contacts as contactsTable, debts, users } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import NoItems from "@/components/ui/no-items";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteContact } from "@/lib/actions";
import dayjs from "dayjs";
import { eq, sql, sum } from "drizzle-orm";
import { Pencil, Trash2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ContactsTable() {
  const session = await getServerSession(authConfig);

  const result = await db
    .select({
      contact: contactsTable,
      owed: sum(
        sql`CASE WHEN ${debts.status} = 'pending' THEN ${debts.amount} ELSE 0 END`
      ),
    })
    .from(contactsTable)
    .innerJoin(users, eq(contactsTable.userId, users.id))
    .leftJoin(debts, eq(contactsTable.id, debts.contactId))
    .where(eq(users.id, session!.user!.id!))
    .groupBy(contactsTable.id)
    .orderBy(contactsTable.firstName);

  if (result.length === 0) {
    return <NoItems />;
  }

  return (
    <Table className="w-full table-fixed">
      <TableHeader className="border-b-2 border-gray-200 pb-2">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Total Owed</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead className="w-30"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="pt-10">
        {result.map(({ contact, owed }) => (
          <TableRow key={contact.id} className="">
            <TableCell>
              <Link
                href={`/contacts/${contact.id}`}
                className="w-full block truncate"
              >
                {contact.firstName} {contact.lastName}
              </Link>
            </TableCell>
            <TableCell>$ {owed ?? 0}</TableCell>
            <TableCell>
              {dayjs(contact.createdAt).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell className="flex justify-start gap-2">
              <Link href={`/contacts/${contact.id}/edit`}>
                <Button variant="secondary" size="icon">
                  <Pencil />
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="icon"
                onClick={deleteContact.bind(null, contact.id)}
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
