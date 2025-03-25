"use client";

import { PaymentInfo } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CopyButton from "@/components/ui/copy-button";
import { DialogTrigger } from "@/components/ui/dialog";
import dayjs from "dayjs";
import {
  ArrowRightLeft,
  CreditCard,
  Landmark,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, ReactElement, SetStateAction } from "react";

export type PaymentInfoCardProps = {
  paymentInfo: PaymentInfo;
  setId: Dispatch<SetStateAction<string>>;
};

export default function PaymentInfoCard({
  paymentInfo,
  setId,
}: PaymentInfoCardProps) {
  let icon: ReactElement;
  let name: string;
  switch (paymentInfo.type) {
    case "clabe":
      icon = <ArrowRightLeft />;
      name = "CLABE";
      break;
    case "cuenta":
      icon = <Landmark />;
      name = "Account Number";
      break;
    case "tarjeta":
      icon = <CreditCard />;
      name = "Card Number";
      break;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          {icon}
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-start gap-2">
          <p className="tabular-nums">
            {paymentInfo.data!.replace(/(\d{4})/g, "$1 ")}
          </p>
          <CopyButton data={paymentInfo.data!} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <p className="text-muted-foreground text-sm">
          {dayjs(paymentInfo.createdAt).format("DD/MM/YYYY")}
        </p>
        <div className="flex flex-row gap-2">
          <Link
            href={`/contacts/${paymentInfo.contactId}/payment-info/${paymentInfo.id}/edit`}
          >
            <Button variant="secondary" size="icon">
              <Pencil />
            </Button>
          </Link>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setId(paymentInfo.id)}
            >
              <Trash2 />
            </Button>
          </DialogTrigger>
        </div>
      </CardFooter>
    </Card>
  );
}
