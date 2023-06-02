import { requireUserId } from "~/session.server";
import { filterReviewsForTable, getTotalReviews } from "~/models/review.server";
import type { APIReview } from "~/utils/types";
import { json, type LoaderArgs } from "@remix-run/server-runtime";

export type ReviewSearchData = {
  data: APIReview[] | [];
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
