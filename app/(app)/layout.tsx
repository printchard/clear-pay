import Navbar from "@/components/ui/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-row">
      <SidebarProvider>
        <Navbar />
        <div className="flex flex-col pt-10 gap-y-5 w-full px-4 overflow-x-hidden h-screen">
          <SidebarTrigger className="md:hidden" />
          {children}
        </div>
      </SidebarProvider>
    </main>
  );
}
