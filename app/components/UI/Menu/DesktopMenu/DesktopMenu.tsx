import type { user } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import type { Dispatch, SetStateAction } from "react";
import Glencairn from "~/components/Icons/Glencairn";
import ThreeVerticalDots from "~/components/Icons/ThreeVerticalDots";
import MenuItem from "../MenuItem";

type DesktopMenuProps = {
  user: user | undefined;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export default function DesktopMenu({ user, setOpened }: DesktopMenuProps) {
  return (
    <>
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
                  className="rounded-lg bg-gray-300 px-6 py-2 font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
                  disabled={!user}
                  aria-disabled={!user}
                >
                  Logout
                </button>
              </Form>
            </div>
          ) : null}
        </div>
      </div>
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
    </>
  );
}
