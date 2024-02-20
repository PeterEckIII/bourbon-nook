import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getReviews } from "~/models/review.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);

  const reviews = await getReviews(userId);

  return { reviews };
};

export default function Reviews() {
  const { reviews } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Hello World!</h1>
      <h3>Your Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <div className="flex">
              <div>{review.bottle?.name}</div>
              <div>{review.bottle?.type}</div>
              <div>Rating: {review.overallRating}/10</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
