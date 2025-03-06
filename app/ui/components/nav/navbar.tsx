"use client";

import ContactsIcon from "../../icons/contacts-icon";
import DashboardIcon from "../../icons/dashboard-icon";
import Navlink from "@/app/ui/components/nav/navlink";
import MoneyIcon from "../../icons/money-icon";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const routes = [
    { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { name: "Debts", href: "/debts", icon: <MoneyIcon /> },
    { name: "Contacts", href: "/contacts", icon: <ContactsIcon /> },
  ];

  return (
    <nav className="flex flex-col items-center justify-start min-h-full w-60 p-8 gap-y-4">
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
    </nav>
  );
}
