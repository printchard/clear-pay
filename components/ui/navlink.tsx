import Link from "next/link";
import clsx from "clsx";

type NavlinkProps = {
  href?: string;
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Navlink({
  href,
  name,
  icon,
  isActive,
  className,
  onClick,
}: NavlinkProps) {
  const finalClassName = clsx(
    "hover:bg-primary hover:text-white hover:cursor-pointer px-2 py-3 w-full rounded-md transition-all duration-200 flex flex-row items-center gap-x-2",
    {
      "bg-primary text-white": isActive,
    },
    className,
  );

  if (href)
    return (
      <Link href={href} className={finalClassName}>
        {icon}
        {name}
      </Link>
    );
  else
    return (
      <button className={finalClassName} onClick={onClick}>
        {icon}
        {name}
      </button>
    );
}
