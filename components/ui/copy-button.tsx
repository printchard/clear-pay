import { Clipboard } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useEffect, useState } from "react";

export default function CopyButton({ data }: { data: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => navigator.clipboard.writeText(data)}
        >
          <Clipboard />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="text-muted-foreground mx-auto w-40 text-center text-xs">
        Copied to clipboard!
      </PopoverContent>
    </Popover>
  );
}
