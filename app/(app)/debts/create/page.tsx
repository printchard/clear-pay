import { createDebt } from "@/lib/actions";
import DebtForm from "../debt-form";

export default function Page() {
  return <DebtForm action={createDebt} />;
}
