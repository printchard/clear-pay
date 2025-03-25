"use client";

import { Contact } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/ui/delete-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
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
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactsTable({
  result,
}: {
  result: { contact: Contact; owed: string | null }[];
}) {
  const [id, setId] = useState<string>("");

  const action = deleteContact.bind(null, id);

  if (result.length === 0) {
    return <NoItems />;
  }

  return (
    <DeleteDialog
      title="Are you sure you want to delete this contact?"
      description="This action is irreversible"
      action={action}
    >
      <Table className="min-w-[600px] table-fixed">
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
                  className="block w-full truncate"
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
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setId(contact.id)}
                  >
                    <Trash2 />
                  </Button>
                </DialogTrigger>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DeleteDialog>
  );
}
