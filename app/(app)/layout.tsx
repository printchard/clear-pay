import Navbar from "@/components/ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-row">
      <Navbar />
      <div className="flex flex-col pt-10 gap-y-5 w-full px-4">{children}</div>
    </main>
  );
}
