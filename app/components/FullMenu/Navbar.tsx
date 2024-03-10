import { Form, NavLink } from "@remix-run/react";

import { UserWithDateAsString } from "~/types/models";

interface NavbarProps {
  user: UserWithDateAsString | null;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <>
      {user ? (
        <nav className="flex justify-between items-center bg-sky-600 w-full">
          <div>
            <ul className="flex items-center">
              <li className="list-none mx-3 my-2 px-2 block">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-sky-500" : "text-white hover:text-sky-300"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="list-none mx-3 my-2 px-2 block">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-sky-500" : "text-white hover:text-sky-300"
                  }
                  to="/bottles"
                >
                  My Bottles
                </NavLink>
              </li>
              <li className="list-none mx-3 my-2 px-2 block">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-sky-500" : "text-white hover:text-sky-300"
                  }
                  to="/reviews"
                >
                  My Reviews
                </NavLink>
              </li>
              <li className="list-none mx-3 my-2 px-2 block">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-sky-500" : "text-white hover:text-sky-300"
                  }
                  to="/bottles/new"
                >
                  Add Bottle
                </NavLink>
              </li>
              <li className="list-none mx-3 my-2 px-2 block">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-sky-500" : "text-white hover:text-blue-300"
                  }
                  to="/reviews/new/bottle"
                >
                  Add Review
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <Form method="post" action="/logout">
              <button type="submit">Logout</button>
            </Form>
          </div>
        </nav>
      ) : (
        <nav className="flex justify-end items-center bg-sky-600 w-full">
          <>
            <ul className="flex items-center">
              <li className="list-none mx-3 my-2 px-2 block ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-sky-500" : "text-white hover:text-sky-300"
                  }
                  to="/login"
                >
                  Sign In
                </NavLink>
              </li>
              <li className="list-none mx-3 my-2 px-2 block ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-sky-500" : "text-white hover:text-sky-300"
                  }
                  to="/join"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </>
        </nav>
      )}
    </>
  );
}
