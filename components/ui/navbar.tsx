"use client";

import Navlink from "@/components/ui/navlink";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  LayoutDashboard,
  Landmark,
  CircleUserRound,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();

  const routes = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Debts", href: "/debts", icon: <Landmark /> },
    { name: "Contacts", href: "/contacts", icon: <CircleUserRound /> },
  ];

  return (
    <nav className="flex flex-col items-center justify-start min-h-full w-60 p-7 gap-y-4 shrink-0">
      <Link href="/dashboard" className="text-3xl font-bold">
        Clear<span className="text-primary">Pay</span>
      </Link>
      {routes.map((route) => (
        <Navlink
          key={route.name}
          href={route.href}
          name={route.name}
          icon={route.icon}
          isActive={pathname === route.href}
        />
      ))}
      <Navlink
        name="Sign Out"
        icon={<LogOut />}
        className="mt-auto"
        onClick={signOut}
      ></Navlink>
    </nav>
  );
}
