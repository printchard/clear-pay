import { PaymentInfo } from "@/app/db/schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { ArrowRightLeft, CreditCard, Landmark } from "lucide-react";
import { ReactElement } from "react";

export type PaymentInfoCardProps = {
  paymentInfo: PaymentInfo;
};

export default function PaymentInfoCard({ paymentInfo }: PaymentInfoCardProps) {
  let icon: ReactElement;
  switch (paymentInfo.type) {
    case "clabe":
      icon = <ArrowRightLeft />;
      break;
    case "cuenta":
      icon = <Landmark />;
      break;
    case "tarjeta":
      icon = <CreditCard />;
      break;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-x-2 items-center">
          {icon}
          {paymentInfo.type.charAt(0).toUpperCase() + paymentInfo.type.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{paymentInfo.data}</p>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          {dayjs(paymentInfo.createdAt).format("DD/MM/YYYY")}
        </p>
      </CardFooter>
    </Card>
  );
}
