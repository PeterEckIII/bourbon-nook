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
        className="block cursor-pointer rounded-lg px-2 py-4 text-lg font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-500 lg:mx-4 lg:text-base lg:text-gray-400 lg:hover:bg-white lg:hover:text-gray-500 xl:mx-6 xl:px-6 xl:text-lg"
      >
        {label}
      </Link>
    </li>
  );
}
