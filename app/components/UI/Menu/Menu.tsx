import type { user } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
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
          " fixed top-0 h-full w-10/12 space-y-5 bg-gray-50 py-2 text-white transition-left duration-300 lg:static lg:flex lg:w-auto lg:items-center lg:justify-center lg:space-y-0 lg:space-x-7 lg:bg-transparent lg:text-gray-500"
        }
      >
        <div className="mr-4 mt-2 flex items-center justify-between lg:hidden">
          <Link to="/" className="text-4xl font-bold leading-none lg:hidden">
            <Glencairn height="110px" width="110px" />
          </Link>
          <div>
            {typeof user !== "undefined" ? (
              <div className="w-full">
                <Form method="post" action="/logout">
                  <button
                    onClick={() => setOpened(false)}
                    type="submit"
                    className="rounded-lg bg-gray-300 py-2 px-6 font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
                  >
                    Logout
                  </button>
                </Form>
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
        {/* MEDIUM AND UP */}
        <div className="hidden lg:flex lg:justify-evenly">
          <MenuItem to="/" label="Home" setOpened={setOpened} />
          <ThreeVerticalDots classes="hidden lg:inline" />
          <MenuItem to="/bottles" label="Collection" setOpened={setOpened} />
          <ThreeVerticalDots classes="hidden lg:inline" />
          <MenuItem to="/reviews" label="Reviews" setOpened={setOpened} />
          <ThreeVerticalDots classes="hidden lg:inline" />
          <MenuItem
            to="/bottles/new/bottle"
            label="Add Bottle"
            setOpened={setOpened}
          />
          <ThreeVerticalDots classes="hidden lg:inline" />
          <MenuItem
            to="/reviews/new/bottle"
            label="New Review"
            setOpened={setOpened}
          />
        </div>

        {/* MOBILE MENU */}
        <div className="mx-4 flex flex-col lg:hidden">
          <div className="my-2">
            <h3 className="text-xl text-gray-500">Bottles</h3>
            <div className="ml-4 mt-2 flex flex-col">
              <MenuItem
                to="/bottles"
                label="Collection"
                setOpened={setOpened}
              />
              <MenuItem
                to="/bottles/new/bottle"
                label="Add Bottle"
                setOpened={setOpened}
              />
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl text-gray-500">Reviews</h3>
            <div className="ml-4 mt-2 flex flex-col">
              <MenuItem to="/reviews" label="Reviews" setOpened={setOpened} />
              <MenuItem
                to="/reviews/new/bottle"
                label="New Review"
                setOpened={setOpened}
              />
            </div>
          </div>
        </div>
        <div className="self-end p-4 pl-4 text-center font-['Satisfy'] text-3xl leading-7 text-blue-500 lg:hidden">
          THE BOURBON NOOK
          <br />
          <span className="text-sm text-gray-700">Created by Peter Eck</span>
        </div>
      </ul>
      {/* HAMBURGER */}
      <div className="block items-center lg:flex">
        <button
          onClick={() => setOpened(!opened)}
          className="group mr-2 flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded border-2 border-black lg:hidden"
        >
          <Hamburger opened={opened} />
        </button>
        {user ? (
          <Form method="post" action="/logout">
            <button
              type="submit"
              className="rounded-xl bg-gray-100 py-2 px-6 text-sm font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
            >
              Logout
            </button>
          </Form>
        ) : (
          <div className="hidden lg:block">
            <AuthMenuItem to="/login" label="Login" />
            <AuthMenuItem to="/join" label="Sign Up" />
          </div>
        )}
      </div>
    </nav>
  );
}
