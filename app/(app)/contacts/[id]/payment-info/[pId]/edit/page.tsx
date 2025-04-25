import { db } from "@/db/db";
import PaymentInfosForm from "../../create/payment-infos-form";
import { paymentInfos } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: Promise<{ pId: string }>;
}) {
  const { pId } = await params;

  const [paymentInfo] = await db
    .select()
    .from(paymentInfos)
    .where(eq(paymentInfos.id, pId));

  return <PaymentInfosForm paymentInfo={paymentInfo} />;
}
