"use server";

import { db } from "@/app/db/db";
import { contacts as contactsTable, users } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
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
import { eq } from "drizzle-orm";
import { Pencil, Trash2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ContactsTable() {
  const session = await getServerSession();
  const user = (
    await db
      .select()
      .from(users)
      .where(eq(users.email, session!.user!.email!))
      .limit(1)
  )[0];

  const contacts = await db
    .select()
    .from(contactsTable)
    .where(eq(contactsTable.userId, user.id))
    .orderBy(contactsTable.firstName);
  return (
    <Table className="w-full  table-fixed">
      <TableHeader className="border-b-2 border-gray-200 pb-2">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead className="w-30"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="pt-10">
        {contacts.map((contact) => (
          <TableRow key={contact.id} className="">
            <TableCell className="truncate">
              {contact.firstName} {contact.lastName}
            </TableCell>
            <TableCell>
              {dayjs(contact.createdAt).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell className="flex justify-start gap-2">
              <Link href={`/contacts/edit/${contact.id}`}>
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
