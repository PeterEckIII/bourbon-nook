import { Form } from "@remix-run/react";
import { Dispatch, SetStateAction } from "react";

import { UserWithDateAsString } from "~/types/models";

interface OverlayProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: UserWithDateAsString | null;
}

export default function Overlay({ open, setOpen, user }: OverlayProps) {
  return (
    <nav
      className={`fixed w-9/12 flex top-0 right-0 px-10 z-10 h-screen pt-24 bg-sky-700 transform delay-100 transition-all duration-300 ${
        open ? "opacity-100 -translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <ul className="w-full flex flex-col items-center my-0 mx-auto">
        {user ? (
          <>
            <div>
              <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
                <a
                  className="h-full w-full py-2 text-lg text-white"
                  onClick={() => setOpen(false)}
                  href="/"
                >
                  Home
                </a>
              </li>
            </div>
            <div>
              <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
                <a
                  className="h-full w-full py-2 text-lg text-white"
                  onClick={() => setOpen(false)}
                  href="/bottles"
                >
                  Bottles
                </a>
              </li>
            </div>
            <div>
              <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
                <a
                  className="h-full w-full py-2 text-lg text-white"
                  onClick={() => setOpen(false)}
                  href="/bottles/new"
                >
                  Add Bottles
                </a>
              </li>
            </div>
            <div>
              <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
                <a
                  className="h-full w-full py-2 text-lg text-white"
                  onClick={() => setOpen(false)}
                  href="/reviews"
                >
                  Reviews
                </a>
              </li>
            </div>
            <div>
              <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
                <a
                  className="h-full w-full py-2 text-lg text-white"
                  onClick={() => setOpen(false)}
                  href="reviews/new/bottle"
                >
                  Add Review
                </a>
              </li>
            </div>
            <div>
              <Form method="post" action="/logout">
                <div className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
                  <button
                    className="h-full w-full py-2 text-lg text-white"
                    onClick={() => setOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              </Form>
            </div>
          </>
        ) : (
          <>
            <div>
              <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
                <a
                  className="h-full w-full py-2 text-lg text-white"
                  onClick={() => setOpen(false)}
                  href="/login"
                >
                  Sign In
                </a>
              </li>
            </div>
            <div>
              <li className="flex w-full leading-8 list-none focus:outline-none group py-2 tracking-normal opacity-50 hover:opacity-100 transition-all duration-200 ease-in-out">
                <a
                  className="h-full w-full py-2 text-lg text-white"
                  onClick={() => setOpen(false)}
                  href="/join"
                >
                  Sign Up
                </a>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}
