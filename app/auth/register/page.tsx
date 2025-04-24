import { createUser } from "@/lib/actions/users";
import RegisterForm from "./register-form";

export default function Page() {
  return (
    <main className="flex h-screen flex-row items-center justify-center">
      <RegisterForm action={createUser} />
    </main>
  );
}
