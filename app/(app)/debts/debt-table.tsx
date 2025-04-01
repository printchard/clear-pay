"use client";

import { Contact, Debt } from "@/app/db/schema";
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
import { deleteDebt } from "@/lib/actions";
import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import StatusBadge from "./status-badge";

export type DebtTableProps = {
  results: {
    debt: Debt;
    contact: Contact;
  }[];
};

export default function DebtTable({ results }: DebtTableProps) {
  const [id, setId] = useState<string>("");

  const action = deleteDebt.bind(null, id);

  if (results.length === 0) {
    return <NoItems />;
  }

  return (
    <DeleteDialog
      action={action}
      title="Are you sure you want to delete this debt?"
      description="This action is irreversible"
    >
      <Table className="min-w-[600px] table-fixed">
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
                  <Link
                    href={`/contacts/${contact.id}`}
                    className="block h-full w-full truncate"
                  >
                    {contact.firstName} {contact.lastName}
                  </Link>
                </TableCell>
                <TableCell>{`$ ${debt.amount}`}</TableCell>
                <TableCell>
                  <StatusBadge status={debt.status!} />
                </TableCell>
                <TableCell>
                  {dayjs(debt.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="flex justify-start gap-2">
                  <Link href={`/debts/${debt.id}/edit`}>
                    <Button variant="secondary" size="icon">
                      <Pencil />
                    </Button>
                  </Link>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setId(debt.id)}
                    >
                      <Trash2 />
                    </Button>
                  </DialogTrigger>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </DeleteDialog>
  );
}
