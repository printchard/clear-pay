import Link from "next/link";
import clsx from "clsx";

type NavlinkProps = {
  href: string;
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

export default function Navlink({ href, name, icon, isActive }: NavlinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "hover:bg-primary hover:text-white px-2 py-3 w-full rounded-md transition-all duration-200 flex flex-row items-center gap-x-2",
        {
          "bg-primary text-white": isActive,
        }
      )}
    >
      {icon}
      {name}
    </Link>
  );
}
