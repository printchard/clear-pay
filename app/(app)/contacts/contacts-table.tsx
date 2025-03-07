import { Contact } from "@/app/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";

type TableProps = {
  contacts: Contact[];
};

export default function ContactsTable({ contacts }: TableProps) {
  return (
    <Table className="w-full">
      <TableHeader className="border-b-2 border-gray-200 pb-2">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="pt-10">
        {contacts.map((contact) => (
          <TableRow key={contact.id} className="">
            <TableCell>
              {contact.firstName} {contact.lastName}
            </TableCell>
            <TableCell>
              {dayjs(contact.createdAt).format("DD/MM/YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
