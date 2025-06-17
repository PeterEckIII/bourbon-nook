import { getReviewsForUser } from '~/models/review';
import type { Route } from './+types/home';
import { requireUserId } from '~/utils/session';
import { Link } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  const reviews = await getReviewsForUser(userId);
  return { reviews };
}

export default function Reviews({ loaderData }: Route.ComponentProps) {
  const { reviews } = loaderData;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Reviews
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        {reviews.map((review) => (
          <li key={review.id}>
            <Link className="font-semibold" to={`/reviews/${review.id}`}>
              {review?.bottle?.name}
            </Link>
            <span className="text-sm text-gray-600 ml-2">
              {review.user.username}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
