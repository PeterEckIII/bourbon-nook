import type { user } from "@prisma/client";
import type { SetStateAction } from "react";
import DesktopMenu from "./DesktopMenu/DesktopMenu";
import HamburgerContainer from "./HamburgerContainer/HamburgerContainer";
import Logo from "./Logo/Logo";
import MobileMenu from "./MobileMenu";

interface MenuProps {
  opened: boolean;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
  user: user | undefined;
}

export default function Menu({ opened, setOpened, user }: MenuProps) {
  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between bg-white shadow-2xl">
      <Logo />
      <ul
        className={
          (opened ? "left-0" : "-left-full") +
          " transition-left fixed top-0 h-full w-10/12 space-y-5 bg-gray-50 py-2 text-white duration-300 lg:static lg:flex lg:w-auto lg:items-center lg:justify-center lg:space-y-0 lg:space-x-7 lg:bg-transparent lg:text-gray-500"
        }
      >
        <DesktopMenu user={user} setOpened={setOpened} />
        <MobileMenu user={user} opened={opened} setOpened={setOpened} />
      </ul>
      <HamburgerContainer user={user} opened={opened} setOpened={setOpened} />
    </nav>
  );
}
