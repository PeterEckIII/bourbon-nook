import type { user } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { SetStateAction } from "react";
import Glencairn from "~/components/Icons/Glencairn";
import Hamburger from "~/components/Icons/Hamburger";
import ThreeVerticalDots from "~/components/Icons/ThreeVerticalDots";
import AuthMenuItem from "./AuthMenuItem";
import MenuItem from "./MenuItem";

interface MenuProps {
  opened: boolean;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
  user: user | undefined;
}

export default function Menu({ opened, setOpened, user }: MenuProps) {
  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between bg-white shadow-2xl">
      <Link to="/" className="text-3xl font-bold leading-none">
        <div className="flex items-center">
          <Glencairn height="90px" width="90px" />
          <div className="p-4 pl-0 text-center font-['Satisfy'] text-2xl leading-7 text-blue-500">
            THE
            <br />
            BOURBON
            <br />
            NOOK
          </div>
        </div>
      </Link>
      <ul
        className={
          (opened ? "left-0" : "-left-full") +
          " fixed top-0 h-full w-10/12 space-y-5 bg-gray-50 py-2 text-white transition-left duration-300 md:static md:flex md:w-auto md:items-center md:justify-center md:space-y-0 md:space-x-7 md:bg-transparent md:text-gray-500"
        }
      >
        <div className="mr-4 mt-2 flex items-center justify-between md:hidden">
          <Link to="/" className="text-4xl font-bold leading-none md:hidden">
            <Glencairn height="110px" width="110px" />
          </Link>
          <div>
            {typeof user !== "undefined" ? (
              <div className="w-full">
                <button onClick={() => setOpened(false)}>
                  <Link
                    to="/logout"
                    className="rounded-lg bg-gray-300 py-2 px-6 font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
                  >
                    Logout
                  </Link>
                </button>
              </div>
            ) : (
              <div className="w-full">
                <button onClick={() => setOpened(false)}>
                  <Link
                    to="/login"
                    className="rounded-lg bg-gray-300 py-2 px-6 font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
                  >
                    Login
                  </Link>
                </button>
                <button onClick={() => setOpened(false)}>
                  <Link
                    to="/join"
                    className="rounded-lg bg-gray-300 py-2 px-6 font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
                  >
                    Sign Up
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
        <MenuItem to="/" label="Home" setOpened={setOpened} />
        <ThreeVerticalDots classes="hidden md:inline" />
        <MenuItem to="/bottles" label="Collection" setOpened={setOpened} />
        <ThreeVerticalDots classes="hidden md:inline" />
        <MenuItem to="/reviews" label="Reviews" setOpened={setOpened} />
        <ThreeVerticalDots classes="hidden md:inline" />
        <MenuItem
          to="/bottles/new/bottle"
          label="Add Bottle"
          setOpened={setOpened}
        />
        <ThreeVerticalDots classes="hidden md:inline" />
        <MenuItem
          to="/reviews/new/bottle"
          label="New Review"
          setOpened={setOpened}
        />
        <div className="self-end p-4 pl-4 text-center font-['Satisfy'] text-3xl leading-7 text-blue-500 md:hidden">
          THE BOURBON NOOK
          <br />
          <span className="text-sm text-gray-700">Created by Peter Eck</span>
        </div>
      </ul>
      <div className="block items-center md:flex">
        <button
          onClick={() => setOpened(!opened)}
          className="group mr-2 flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded border-2 border-black md:hidden"
        >
          <Hamburger opened={opened} />
        </button>
        {user ? (
          <div className="hidden md:block">
            <AuthMenuItem to="/logout" label="Logout" />
          </div>
        ) : (
          <div className="hidden md:block">
            <AuthMenuItem to="/login" label="Login" />
            <AuthMenuItem to="/join" label="Sign Up" />
          </div>
        )}
      </div>
    </nav>
  );
}
