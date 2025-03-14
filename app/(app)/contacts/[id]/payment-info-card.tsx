import { PaymentInfo } from "@/app/db/schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { CreditCard } from "lucide-react";

export type PaymentInfoCardProps = {
  paymentInfo: PaymentInfo;
};

export default function PaymentInfoCard({ paymentInfo }: PaymentInfoCardProps) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex gap-x-2 items-center">
          <CreditCard />
          {paymentInfo.type.charAt(0).toUpperCase() + paymentInfo.type.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{paymentInfo.data}</p>
      </CardContent>
      <CardFooter>
        <p>{dayjs(paymentInfo.createdAt).format("DD/MM/YYYY")}</p>
      </CardFooter>
    </Card>
  );
}
