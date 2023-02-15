import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { LoaderFunction, LinksFunction } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import { getReviewsForTable } from "~/models/review.server";

import GridStyles from "ag-grid-community/styles/ag-grid.css";
import AlpineTheme from "ag-grid-community/styles/ag-theme-alpine.css";
import StatusBarStyles from "~/styles/statusBar.css";
import DataGrid from "~/components/Review/Grid/DataGrid";

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
      rel: "preload",
      href: StatusBarStyles,
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
    {
      rel: "stylesheet",
      href: StatusBarStyles,
    },
  ];
};

export interface LoaderData {
  reviewListItems: Awaited<ReturnType<typeof getReviewsForTable>>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const reviewListItems = await getReviewsForTable({ userId });
  return json<LoaderData>({ reviewListItems });
};

export default function ReviewIndexPage() {
  const { reviewListItems } = useLoaderData<LoaderData>();
  const reviewList = reviewListItems.map((review) => {
    if (
      typeof window === "undefined" ||
      typeof review === "undefined" ||
      !review ||
      !review.bottle ||
      typeof review.bottle === "undefined"
    ) {
      return [];
    }
    return {
      name: review.bottle.name,
      type: review.bottle.type,
      distillery: review.bottle.distiller,
      producer: review.bottle.producer,
      proof: review.bottle.proof,
      age: review.bottle.age,
      price: review.bottle.price,
      date: review.date,
      rating: review.overallRating,
      value: review.value,
      alcoholPercent: review.bottle.alcoholPercent,
      imageUrl: review.bottle.imageUrl,
      reviewId: `${review.id}`,
    };
  });

  return (
    <div className="w-full">
      {reviewListItems.length > 0 ? (
        <p className="text-lg font-semibold text-white">
          Select a review from the table below or{" "}
          <Link
            prefetch="intent"
            to="/reviews/new/bottle"
            className="text-lg font-semibold text-white underline"
            id="create-new-review-link"
          >
            create a new review.
          </Link>
        </p>
      ) : (
        <p>
          You have no reviews. Create your first review{" "}
          <Link
            prefetch="intent"
            to="/reviews/new/bottle"
            className="text-lg font-semibold text-white underline"
            id="create-new-review-link"
          >
            here
          </Link>{" "}
        </p>
      )}
      {reviewListItems.length > 0 ? (
        <>
          <DataGrid initialData={reviewList} />
        </>
      ) : null}
      <Outlet />
    </div>
  );
}
