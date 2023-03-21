import type {
  ErrorBoundaryComponent,
  LinksFunction,
  LoaderArgs,
} from "@remix-run/server-runtime";
import ReviewGrid from "~/components/Grids/ReviewGrid";

import GridStyles from "ag-grid-community/styles/ag-grid.css";
import AlpineTheme from "ag-grid-community/styles/ag-theme-alpine.css";
import { useCatch } from "@remix-run/react";
import { getReviewsForTable } from "~/models/review.server";
import { requireUserId } from "~/session.server";
import { useTypedLoaderData } from "remix-typedjson";
import BottleGrid from "~/components/Grids/BottleGrid";
import useWindowSize from "~/utils/useWindowSize";
import TestGrid from "~/components/Grids/TestGrid/TestGrid";

export const links: LinksFunction = () => [
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

export default function Grid() {
  const { width, height } = useWindowSize();
  return (
    <div className="mt-4 w-full rounded-lg bg-white px-4 pt-2 pb-8">
      <div className="border-2 border-red-500">
        <span>Width: {width}</span>
        <span>Height: {height} </span>
      </div>
      <section id="bottle-grid-wrapper" className="mb-2 w-full">
        <div>
          {/* <ReviewGrid /> */}
          <div className="my-8"></div>
          <TestGrid />
          {/* <BottleGrid /> */}
        </div>
      </section>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="h-[1000px] w-[500px] bg-white">
      <h1>Caught</h1>
      <p>Status: {caught.status} </p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="h-[1000px] w-[500px] bg-white">
      <h1>Error!</h1>
      <p>{error.message}</p>
      <p>Stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
};
