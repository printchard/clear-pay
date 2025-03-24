import { Contact, Debt } from "@/app/db/schema";
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
import { deleteDebt } from "@/lib/actions";
import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import StatusBadge from "./status-badge";
import DeleteDialog from "@/components/ui/delete-dialog";

export type DebtTableProps = {
  results: {
    debt: Debt;
    contact: Contact;
  }[];
};

export default async function DebtTable({ results }: DebtTableProps) {
  if (results.length === 0) {
    return <NoItems />;
  }

  return (
    <Table className="table-fixed min-w-[600px]">
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
                  className="w-full h-full block truncate"
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
                <DeleteDialog
                  action={deleteDebt.bind(null, debt.id)}
                  title="Are you sure you want to delete this debt?"
                  description="This actions is irreversible"
                >
                  <Button variant="destructive" size="icon">
                    <Trash2 />
                  </Button>
                </DeleteDialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
