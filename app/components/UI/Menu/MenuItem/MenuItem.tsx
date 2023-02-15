import { Link } from "@remix-run/react";
import type { SetStateAction } from "react";

interface MenuItemProps {
  to:
    | "/"
    | "/bottles"
    | "/reviews"
    | "/bottles/new/bottle"
    | "/reviews/new/bottle";
  label: "Home" | "Collection" | "Reviews" | "Add Bottle" | "New Review";
  setOpened: React.Dispatch<SetStateAction<boolean>>;
}

export default function MenuItem({ to, label, setOpened }: MenuItemProps) {
  return (
    <li onClick={() => setOpened(false)} className="list-none">
      <Link
        to={to}
        className="md:text-md mx-4 block cursor-pointer rounded-lg p-4 text-lg font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-500 md:text-gray-400 md:hover:bg-white md:hover:text-gray-500"
      >
        {label}
      </Link>
    </li>
  );
}
