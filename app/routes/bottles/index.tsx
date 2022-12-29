import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs, LinksFunction } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import { getBottlesForUser } from "~/models/bottle.server";

import GridStyles from "ag-grid-community/styles/ag-grid.css";
import AlpineTheme from "ag-grid-community/styles/ag-theme-alpine.css";
import Grid from "~/components/Bottle/Grid/Grid";

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
  collection: Awaited<ReturnType<typeof getBottlesForUser>>;
  userId: string;
}

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const collection = await getBottlesForUser(userId);
  return json<LoaderData>({ collection, userId });
};

export default function BottleIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      {data?.collection.length > 0 ? (
        <p>
          No bottle selected. Select a bottle from your collection, or{" "}
          <Link
            prefetch="intent"
            to="/bottles/new/image"
            className="text-blue-500 underline"
            id="create-new-bottle-link"
          >
            add a new bottle to your collection
          </Link>
        </p>
      ) : (
        <p>
          You have no bottles in your collection. Add your first bottle{" "}
          <Link
            to="/bottles/new/image"
            prefetch="intent"
            className="text-blue-500 underline"
            id="create-new-bottle-link"
          >
            here
          </Link>
        </p>
      )}
      {data?.collection.length > 0 ? (
        <Grid initialData={data?.collection} />
      ) : null}
      <div className="flex min-h-full flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
}
