import { createUser } from "@/lib/actions";
import RegisterForm from "./register-form";

export default function Page() {
  return (
    <main className="flex flex-row items-center justify-center h-screen">
      <RegisterForm action={createUser} />
    </main>
  );
}
