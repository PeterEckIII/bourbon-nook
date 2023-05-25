import type { user } from "@prisma/client";
import { Form } from "@remix-run/react";
import type { Dispatch, SetStateAction } from "react";
import Hamburger from "~/components/Icons/Hamburger";
import AuthMenuItem from "../AuthMenuItem";

type HamburgerContainerProps = {
  user: user | undefined;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export default function HamburgerContainer({
  user,
  opened,
  setOpened,
}: HamburgerContainerProps) {
  return (
    <div className="block items-center lg:flex">
      <button
        onClick={() => setOpened(!opened)}
        className="group mr-2 flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded border-2 border-black lg:hidden"
        aria-haspopup="menu"
        aria-pressed={opened}
      >
        <Hamburger opened={opened} />
      </button>
      {user ? (
        <Form method="post" action="/logout">
          <button
            type="submit"
            className="hidden rounded-xl bg-gray-100 px-6 py-2 text-sm font-bold text-gray-900 transition duration-200 hover:bg-gray-200 lg:ml-auto lg:mr-3 lg:inline-block"
            disabled={!user}
            aria-disabled={!user}
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
  );
}
