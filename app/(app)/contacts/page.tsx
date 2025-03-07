import { db } from "@/app/db/db";
import ContactsTable from "./contacts-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const contacts = await db.query.contacts.findMany();
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link href="/contacts/create">
          <Button className="hover:cursor-pointer">Add Contact</Button>
        </Link>
      </div>
      <ContactsTable contacts={contacts} />
    </>
  );
}
