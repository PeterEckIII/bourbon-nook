import { LoaderFunctionArgs, json } from "@remix-run/node";
import { redirect } from "remix-typedjson";

import { getTotalReviews, searchReviews } from "~/models/review.server";
import { requireUserId } from "~/session.server";
import { TableReview } from "~/types/review";

export interface ReviewSearchData {
  reviews: TableReview[] | [];
  reviewCount: number;
  totalPages: number;
  error?: string;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  if (!userId) {
    redirect("/login");
  }
  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.toLowerCase() || "";
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  const offset = page * limit;

  try {
    const reviews = await searchReviews(userId, query, offset, limit);
    const reviewCount = await getTotalReviews({ userId });

    const totalPages = Math.ceil(reviewCount / limit);

    return json<ReviewSearchData>({
      reviews,
      reviewCount,
      totalPages,
    });
  } catch (error) {
    return json<ReviewSearchData>({
      reviews: [],
      reviewCount: 0,
      totalPages: 0,
      error: `Error finding reviews with query ${query} -- Msg: ${error}`,
    });
  }

  return null;
};
