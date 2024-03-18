import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";

import Header from "~/components/NewMenu/Header";
import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";

import Navbar from "./components/NewMenu/Navbar";
import Overlay from "./components/NewMenu/Overlay";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  const [open, setOpen] = useState(false);
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="hidden lg:flex">
          <Navbar user={user} />
        </div>
        <div className="flex justify-end items-center bg-sky-600">
          <Header open={open} setOpen={setOpen} />
          <Overlay open={open} setOpen={setOpen} user={user} />
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
