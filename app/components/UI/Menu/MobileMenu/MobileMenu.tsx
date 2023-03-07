import type { user } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import MenuItem from "../MenuItem";

type MobileMenuProps = {
  user: user | undefined;
  setOpened: Dispatch<SetStateAction<boolean>>;
  opened: boolean;
};

export default function MobileMenu({
  user,
  opened,
  setOpened,
}: MobileMenuProps) {
  return (
    <>
      <div className="mx-4 flex flex-col lg:hidden">
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <button onClick={() => setOpened(false)} className="w-full">
              <Link
                to="/login"
                className="rounded-lg bg-gray-300 py-2 px-6 font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
              >
                Login
              </Link>
            </button>
            <button onClick={() => setOpened(false)} className="w-full">
              <Link
                to="/join"
                className="rounded-lg bg-gray-300 py-2 px-6 font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
              >
                Sign Up
              </Link>
            </button>
          </>
        )}
      </div>
      <div className="self-end p-4 pl-4 text-center font-['Satisfy'] text-3xl leading-7 text-blue-500 lg:hidden">
        THE BOURBON NOOK
        <br />
        <span className="text-sm text-gray-700">Created by Peter Eck</span>
      </div>
    </>
  );
}
