import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs, LinksFunction } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import { getBottlesForUser } from "~/models/bottle.server";

import GridStyles from "ag-grid-community/styles/ag-grid.css";
import AlpineTheme from "ag-grid-community/styles/ag-theme-alpine.css";
import type { bottle, review } from "@prisma/client";
import BottleGrid from "~/components/Grids/BottleGrid";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: GridStyles,
      as: "style",
    },
    {
      rel: "preload",
      href: AlpineTheme,
      as: "style",
    },
    {
      rel: "stylesheet",
      href: GridStyles,
    },
    {
      rel: "stylesheet",
      href: AlpineTheme,
    },
  ];
};

export interface LoaderData {
  collection: (bottle & { reviews: review[] })[];
  userId: string;
}

export default function BottleIndexPage() {
  return (
    <div className="w-full bg-white">
      <BottleGrid />
    </div>
  );
}
