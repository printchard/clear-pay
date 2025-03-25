import Navbar from "@/components/ui/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Navbar />
      <main className="flex h-screen w-full flex-row">
        <div className="flex h-screen w-full flex-col gap-y-5 overflow-y-auto px-4 pt-10">
          <SidebarTrigger className="md:hidden" />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
