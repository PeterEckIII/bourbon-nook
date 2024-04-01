import { Dispatch, SetStateAction } from "react";

import { UserWithDateAsString } from "~/types/models";

import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Overlay from "./Overlay/Overlay";

interface MenuProps {
  user: UserWithDateAsString | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Menu({ user, open, setOpen }: MenuProps) {
  return (
    <div className="">
      <div className="hidden lg:flex">
        <Navbar user={user} />
      </div>
      <div className="flex justify-end items-center bg-sky-600">
        <Header open={open} setOpen={setOpen} />
        <Overlay open={open} setOpen={setOpen} user={user} />
      </div>
    </div>
  );
}
