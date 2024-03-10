import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ open, setOpen }: HeaderProps) {
  return (
    <button
      className="lg:hidden flex top-0 right-0 z-20 relative w-10 h-10 text-white focus:outline-none bg"
      onClick={() => setOpen(!open)}
    >
      <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 right-1/2 top-1/2">
        <span
          className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
            open ? "rotate-45 delay-200" : "-translate-y-1.5"
          }`}
        ></span>
        <span
          className={`absolute h-0.5 bg-white transform transition-all duration-200 ease-in-out ${
            open ? "scale-x-0 w-0" : "w-5 delay-200 opacity-100"
          }`}
        ></span>
        <span
          className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
            open ? "-rotate-45 delay-200" : "translate-y-1.5"
          }`}
        ></span>
      </div>
    </button>
  );
}
