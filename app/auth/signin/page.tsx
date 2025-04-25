import { verifyJWT } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SigninForm from "./signin-form";

export default async function Page() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt");
  const session = cookie ? verifyJWT(cookie.value) : null;
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex h-screen flex-row items-center justify-center">
      <Suspense>
        <SigninForm />
      </Suspense>
    </main>
  );
}
