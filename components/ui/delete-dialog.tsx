import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

type DeleteDialogProps = {
  children: React.ReactNode;
  action: () => Promise<void>;
  title: string;
  description: string;
};

export default function DeleteDialog({
  children,
  action,
  title,
  description,
}: DeleteDialogProps) {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={action} variant="destructive">
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      {children}
    </Dialog>
  );
}
