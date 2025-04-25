"use client";

import { Contact } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/ui/delete-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import NoItems from "@/components/ui/no-items";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteContact } from "@/lib/actions/contacts";
import { useSearchParam } from "@/hooks/useSearchParam";
import dayjs from "dayjs";
import { Pencil, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactsTable({
  result,
}: {
  result: { contact: Contact; owed: string | null }[];
}) {
  const [name, setName] = useSearchParam("name");
  const [id, setId] = useState<string>("");

  const action = deleteContact.bind(null, id);

  return (
    <DeleteDialog
      title="Are you sure you want to delete this contact?"
      description="This action is irreversible"
      action={action}
    >
      <div className="text-muted-foreground flex items-center justify-between gap-2">
        <picture className="size-6">
          <Search />
        </picture>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search for a contact..."
        />
      </div>
      {result.length > 0 ? (
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
                <TableCell className="flex items-center justify-center gap-2">
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
      ) : (
        <NoItems />
      )}
    </DeleteDialog>
  );
}
