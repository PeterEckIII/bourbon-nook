export interface HamburgerProps {
  opened: boolean;
}

export default function Hamburger({ opened }: HamburgerProps) {
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
  return (
    <div className="group flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded md:hidden">
      <div
        className={`${genericHamburgerLine} ${
          opened
            ? "translate-y-3 rotate-45 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          opened ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          opened
            ? "-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </div>
  );
}
