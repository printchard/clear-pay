import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import DebtTable from "./debt-table";

export default function Page() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Debts</h1>
        <Link href="/debts/create">
          <Button size="icon">
            <Plus />
          </Button>
        </Link>
      </div>
      <DebtTable />
    </>
  );
}
