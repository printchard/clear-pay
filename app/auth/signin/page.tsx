import { Suspense } from "react";
import SigninForm from "./signin-form";

export default function Page() {
  return (
    <main className="flex flex-row items-center justify-center h-screen">
      <Suspense>
        <SigninForm />
      </Suspense>
    </main>
  );
}
