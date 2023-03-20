import { requireUserId } from "../../../session.server";
import {
  filterReviewsForTable,
  getTotalReviews,
} from "../../../models/review.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";

export type GridReview = {
  id: string;
  date: string | null;
  overallRating: number | null;
  value: number | null;
  bottle: {
    name: string;
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

export type ReviewSearchData = {
  data: GridReview[] | [];
  totalReviews: number;
  totalPages: number;
  error?: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  let offset = page * limit;

  try {
    const reviews = await filterReviewsForTable({
      userId,
      query,
      skip: offset,
      take: limit,
    });
    const totalReviews = await getTotalReviews({ userId, query });

    const totalPages = Math.ceil(totalReviews / limit);

    return json<ReviewSearchData>({
      data: reviews,
      totalReviews,
      totalPages,
    });
  } catch (error) {
    return json<ReviewSearchData>({
      data: [],
      totalReviews: 0,
      totalPages: 0,
      error: `Error finding reviews: ${error}`,
    });
  }
};
