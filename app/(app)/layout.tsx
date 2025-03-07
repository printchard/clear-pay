import Navbar from "@/app/ui/components/nav/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-row">
      <Navbar />
      {children}
    </main>
  );
}
