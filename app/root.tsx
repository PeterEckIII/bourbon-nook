import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { useOptionalUser } from "./utils";
import { useState } from "react";
import Menu from "./components/UI/Menu/Menu";

export const links: LinksFunction = () => {
  return [
    { rel: "preload", href: tailwindStylesheetUrl, as: "style" },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
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

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Bourbon Journal",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  const user = useOptionalUser();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <html lang="en" className="h-full" suppressHydrationWarning={true}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className={opened ? "bg-gray-700" : "bg-blue-500"}>
        <header>
          <Menu opened={opened} setOpened={setOpened} user={user} />
        </header>
        <div
          id="root"
          className={`${
            opened ? "opacity-20 transition-opacity ease-in-out" : ""
          }`}
          onClick={() => setOpened(false)}
        >
          <Outlet />
          <LiveReload />
          <ScrollRestoration />
          <Scripts />
        </div>
      </body>
    </html>
  );
}
