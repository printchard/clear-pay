import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactsTable from "./contacts-table";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link href="/contacts/create">
          <Button className="hover:cursor-pointer" size="icon">
            <Plus />
          </Button>
        </Link>
      </div>
      <ContactsTable />
    </>
  );
}
