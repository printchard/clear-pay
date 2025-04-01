"use client";

import { parseStatusEnum } from "@/app/db/schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParam } from "@/hooks/useSearchParam";
import { Search } from "lucide-react";

export default function DebtFilters() {
  const [name, setName] = useSearchParam("name");
  const [status, setStatus] = useSearchParam("status", 0);

  const parsedStatus = parseStatusEnum(status) ?? "all";

  return (
    <div className="text-muted-foreground flex items-center justify-between gap-2">
      <picture className="size-6">
        <Search />
      </picture>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search for a debt..."
      />
      <Select
        value={parsedStatus}
        onValueChange={(value) => setStatus(value === "all" ? "" : value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
