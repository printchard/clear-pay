import { SessionProvider } from "@/components/session-context";
import Navbar from "@/components/ui/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { verifyJWT } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt");
  const session = cookie ? verifyJWT(cookie.value) : null;
  if (!session) {
    const headerStore = await headers();
    const callbackUrl = headerStore.get("clear-pay-callback-url");
    const redirectUrl = callbackUrl
      ? `/auth/signin?callbackUrl=${callbackUrl}`
      : "/auth/signin";

    redirect(redirectUrl);
  }

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <Navbar />
        <main className="flex h-screen w-full flex-row">
          <div className="flex h-screen w-full flex-col gap-y-5 overflow-y-auto px-4 pt-10">
            <SidebarTrigger className="md:hidden" />
            {children}
          </div>
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
