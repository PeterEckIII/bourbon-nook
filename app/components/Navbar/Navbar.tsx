import { NavLink } from "@remix-run/react";

import { UserWithDateAsString } from "~/types/models";

interface NavbarProps {
  user: UserWithDateAsString | null;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="flex justify-between bg-slate-500">
      <div>
        <ul className="flex items-center">
          <li className="list-none mx-3 my-2 px-2 ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white hover:text-blue-300"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="list-none mx-3 my-2 px-2 ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white hover:text-blue-300"
              }
              to="/bottles"
            >
              My Bottles
            </NavLink>
          </li>
          <li className="list-none mx-3 my-2 px-2 ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white hover:text-blue-300"
              }
              to="/reviews"
            >
              My Reviews
            </NavLink>
          </li>
          <li className="list-none mx-3 my-2 px-2 ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white hover:text-blue-300"
              }
              to="/bottles/new"
            >
              Add Bottle
            </NavLink>
          </li>
          <li className="list-none mx-3 my-2 px-2 ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-white hover:text-blue-300"
              }
              to="/reviews/new/bottle"
            >
              Add Review
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center">
        {user ? (
          <form method="post" action="/logout">
            <button className="block text-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <br />
              <span>Log Out</span>
            </button>
          </form>
        ) : (
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <br />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
}
