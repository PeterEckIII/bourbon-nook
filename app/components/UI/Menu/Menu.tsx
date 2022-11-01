import { Form, Link } from "@remix-run/react";

interface MenuProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
}

export default function Menu({ opened, setOpened }: MenuProps) {
  return (
    <div>
      <nav>
        <section className="flex lg:hidden" aria-hidden={!opened}>
          <div
            id="hamburger-menu"
            className="cursor-pointer space-y-2"
            onClick={() => setOpened(!opened)}
          >
            <span className="block h-0.5 w-8 bg-gray-50 text-white"></span>
            <span className="block h-0.5 w-8 bg-gray-50 text-white"></span>
            <span className="block h-0.5 w-8 bg-gray-50 text-white"></span>
          </div>
          <div
            className={
              opened
                ? "align-center absolute top-0 left-0 z-10 flex h-[100vh] w-full flex-col justify-evenly bg-blue-900"
                : "hidden"
            }
          >
            <div
              className="absolute top-0 right-0 cursor-pointer px-8 py-8"
              onClick={() => setOpened(!opened)}
            >
              <svg
                className="h-8 w-8 text-gray-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex min-h-[250px] flex-col items-center justify-between">
              <li
                id="my-review-link_mobile"
                className="my-8 border-b border-gray-400 uppercase"
              >
                <Link
                  className="text-blue-100 hover:text-blue-500 active:text-blue-600"
                  to="/reviews"
                  onClick={() => {
                    setTimeout(() => setOpened(false), 300);
                  }}
                >
                  My Reviews
                </Link>
              </li>
              <li
                id="new-review-link_mobile"
                className="my-8 border-b border-gray-400 uppercase"
              >
                <Link
                  className="text-blue-100 hover:text-blue-500 active:text-blue-600"
                  to="/reviews/new/bottleInfo"
                  onClick={() => {
                    setTimeout(() => setOpened(false), 300);
                  }}
                >
                  New Review
                </Link>
              </li>
              <li
                id="logout-link_mobile"
                className="my-8 border-b border-gray-400 uppercase"
              >
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className="uppercase text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                    onClick={() => {
                      setTimeout(() => setOpened(false), 300);
                    }}
                  >
                    Logout
                  </button>
                </Form>
              </li>
            </ul>
          </div>
          <ul className="hidden space-x-8 lg:flex" aria-hidden={opened}>
            <li id="my-review-link_desktop">
              <Link
                className="text-blue-100 hover:text-blue-500 active:text-blue-600"
                to="/reviews"
              >
                My Reviews
              </Link>
            </li>
            <li id="new-review-link_desktop">
              <Link
                to="/reviews/new/bottleInfo"
                className="text-blue-100 hover:text-blue-500 active:text-blue-600"
              >
                New Review
              </Link>
            </li>
            <li>
              <Form action="/logout" method="post">
                <button
                  id="logout-link_desktop"
                  type="submit"
                  className="text-blue-100 hover:text-blue-500 active:text-blue-600"
                >
                  Logout
                </button>
              </Form>
            </li>
          </ul>
        </section>
      </nav>
    </div>
  );
}
