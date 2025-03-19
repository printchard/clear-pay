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
                <Link href={`/debts/${debt.id}/edit`}>
                  <Button variant="secondary" size="icon">
                    <Pencil />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={deleteDebt.bind(null, debt.id)}
                >
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
