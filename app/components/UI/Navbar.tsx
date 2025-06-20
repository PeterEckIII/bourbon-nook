import { Form, NavLink } from 'react-router';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useViewportSize } from '~/hooks/useViewportSize';
import { cn } from '~/utils/utils';

interface NavLinkType {
  name: string;
  path: string;
}

const navLinks: NavLinkType[] = [
  { name: 'Home', path: '/' },
  { name: 'Bottles', path: '/bottles' },
  { name: 'Reviews', path: '/reviews' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { width } = useViewportSize();
  const isMobile = width! < 768;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenuOnMobile = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  return (
    <header className="w-full px-8 shadow-sm shadow-neutral-500 h-[80px] flex items-center z-10">
      <nav className="flex items-center justify-between w-full">
        <NavLink to="/" className="font-bold">
          BourbonNook
        </NavLink>
        <ul
          className={cn(
            'flex items-center gap-8',
            menuOpen &&
              'bg-neutral-700 flex-col fixed top-[80px] right-0 bottom-0 w-1/2 p-8 transform transition-transform duration-300 ease-in-out translate-x-0',
            !menuOpen &&
              isMobile &&
              'bg-neutral-700 flex-col fixed top-[80px] right-0 bottom-0 w-1/2 p-8 transform transition-transform duration-300 ease-in-out translate-x-full'
          )}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-sky-500 cursor-pointer'
                    : 'hover:text-blue-500 cursor-pointer'
                }
                onClick={closeMenuOnMobile}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li>
            <Form action="/logout" method="post">
              <button
                className="cursor-pointer hover:text-blue-500"
                type="submit"
              >
                Logout
              </button>
            </Form>
          </li>
        </ul>
        <button
          aria-labelledby="Menu toggle button"
          className="block md:hidden"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <XIcon className="cursor-pointer size-6 text-secondary" />
          ) : (
            <MenuIcon className="z-10 cursor-pointer size-6 text-secondary" />
          )}
        </button>
      </nav>
    </header>
  );
}
