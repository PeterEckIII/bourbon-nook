import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
        <Link
          to="/"
          className="title-font flex items-center justify-center font-medium text-gray-900 md:justify-start"
        >
          <span className="ml-3 font-['Satisfy'] text-xl">Bourbon Nook</span>
        </Link>
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
          © 2022 Bourbon Nook —
          <a
            href="https://github.com/PeterEckIII"
            className="ml-1 text-gray-600"
            rel="noopener noreferrer"
            target="_blank"
          >
            @PeterEckIII
          </a>
        </p>
      </div>
    </div>
  );
}
