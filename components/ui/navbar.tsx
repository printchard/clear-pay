"use client";

import Navlink from "@/components/ui/navlink";
import {
  CircleUserRound,
  Landmark,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "./sidebar";

export default function Navbar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  // @eslint-ignore-next-line
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname]);

  const routes = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Debts", href: "/debts", icon: <Landmark /> },
    { name: "Contacts", href: "/contacts", icon: <CircleUserRound /> },
  ];

  return (
    <Sidebar className="flex h-full w-60 flex-col items-center justify-start gap-y-4">
      <SidebarHeader className="flex items-start justify-center p-7">
        <Link href="/dashboard" className="text-3xl font-bold">
          Clear<span className="text-primary">Pay</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-7">
        {routes.map((route) => (
          <Navlink
            key={route.name}
            href={route.href}
            name={route.name}
            icon={route.icon}
            isActive={pathname === route.href}
          />
        ))}
      </SidebarContent>
      <SidebarFooter className="p-7">
        <Navlink name="Sign Out" icon={<LogOut />} onClick={signOut}></Navlink>
      </SidebarFooter>
    </Sidebar>
  );
}
