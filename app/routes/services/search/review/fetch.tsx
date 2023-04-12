import type { Ref } from "react";
import { requireUserId } from "~/session.server";
import { filterReviewsForTable, getTotalReviews } from "~/models/review.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type { BottleStatus, Prisma } from "@prisma/client";

export type Limit = 10 | 25 | 50 | 75 | 100 | 250;

export type GridReview = {
  id: string;
  date: string | null;
  overallRating: number | null;
  value: number | null;
  bottle: {
    name: string;
    status: BottleStatus;
    type: string;
    distiller: string | null;
    producer: string | null;
    proof: string | null;
    alcoholPercent: string | null;
    age: string | null;
    price: string | null;
    imageUrl: string | null;
  } | null;
};

export type ReviewData = {
  reviews: GridReview[] | [];
  totalPages: number;
};

export type ReviewFields = {
  id: string;
  overallRating: number;
  date: string;
  value: number;
  name: string;
  type: string;
  status: BottleStatus;
  distiller: string;
  producer: string;
  proof: string;
  alcoholPercent: string;
  age: string;
  price: string;
  imageUrl: string;
};

export type SortableColumn = {
  kind: "sortable";
  header: string;
  field:
    | "name"
    | "date"
    | "status"
    | "type"
    | "distiller"
    | "producer"
    | "country"
    | "region"
    | "price"
    | "overallRating"
    | "value";
  sort: true;
  sortDirection: Prisma.SortOrder;
  ref: Ref<HTMLTableCellElement>;
};

export type UnsortableColumn = {
  kind: "unsortable";
  header: string;
  field: keyof ReviewFields;
  sort: false;
  ref: Ref<HTMLTableCellElement>;
};

export type ReviewSearchData = {
  items: GridReview[] | [];
  totalReviews: number;
  totalPages: number;
  error?: string;
};

export type ReviewSortOptions =
  | "name"
  | "date"
  | "status"
  | "type"
  | "distiller"
  | "producer"
  | "country"
  | "region"
  | "price"
  | "overallRating"
  | "value";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);

  const query = url.searchParams.get("query") || "";
  const sort = url.searchParams.get("sort");
  const direction = url.searchParams.get("direction");
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  let offset = page + limit;

  try {
    const reviews = await filterReviewsForTable({
      userId,
      query,
      skip: offset,
      take: limit,
      sort: sort as ReviewSortOptions,
      direction: direction as Prisma.SortOrder,
    });

    const totalReviews = await getTotalReviews({ userId, query });
    const totalPages = Math.ceil(totalReviews / limit);

    return json<ReviewSearchData>({
      items: reviews,
      totalPages,
      totalReviews,
    });
  } catch (error) {
    return json<ReviewSearchData>({
      items: [],
      totalPages: 0,
      totalReviews: 0,
      error: `Error fetching those reviews: ${error}`,
    });
  }
};
