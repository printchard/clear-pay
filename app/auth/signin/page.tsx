"use client";

import { SessionProvider } from "next-auth/react";
import SigninForm from "./signin-form";

export default function Page() {
  return (
    <main className="flex flex-row items-center justify-center h-screen">
      <SessionProvider>
        <SigninForm />
      </SessionProvider>
    </main>
  );
}
