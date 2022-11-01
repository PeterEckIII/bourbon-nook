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

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
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
  return (
    <html lang="en" className="h-full" suppressHydrationWarning={true}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
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
