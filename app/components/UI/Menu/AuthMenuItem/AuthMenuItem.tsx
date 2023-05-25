import { Link } from "@remix-run/react";

interface AuthMenuItemProps {
  to: "/login" | "/join" | "/logout";
  label: "Login" | "Sign Up" | "Logout";
}

export default function AuthMenuItem({ to, label }: AuthMenuItemProps) {
  return (
    <li className="list-none">
      <Link
        to={to}
        className="rounded-xl bg-gray-100 px-6 py-2 text-sm font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
      >
        {label}
      </Link>
    </li>
  );
}
