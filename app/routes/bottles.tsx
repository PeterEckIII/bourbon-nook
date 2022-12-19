import { Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: "https://fonts.googleapis.com/css2?family=Courgette&family=Satisfy&display=swap",
    },
    {
      rel: "preload",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preload",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Courgette&family=Satisfy&display=swap",
    },
  ];
};

export default function BottlesPage() {
  return (
    <main className="flex h-full bg-white" aria-roledescription="aside">
      <div className="flex w-full justify-center p-6">
        <Outlet />
      </div>
    </main>
  );
}
