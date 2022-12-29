import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  Link,
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
import Glencairn from "./components/Icons/Glencairn";
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
      <body>
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
          <h1 className="text-3xl font-bold">
            <Link to="/" className="flex items-center text-white">
              <div className="flex">
                <Glencairn />
                <div className="text-center font-['Satisfy'] text-2xl leading-7">
                  THE
                  <br />
                  BOURBON
                  <br />
                  NOOK
                </div>
              </div>
            </Link>
          </h1>
          <p className="font-['Courgette'] text-xl">{user?.email ?? ""}</p>
          <Menu opened={opened} setOpened={setOpened} />
        </header>
        <div id="root">
          <Outlet />
          <LiveReload />
          <ScrollRestoration />
          <Scripts />
        </div>
      </body>
    </html>
  );
}
