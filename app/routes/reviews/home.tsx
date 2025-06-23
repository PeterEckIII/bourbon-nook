import { getFilteredReviews, getReviewsForUser } from '~/models/review';
import type { Route } from './+types/home';
import { requireUserId } from '~/utils/session';
import { Form, Link, useNavigation, useSubmit } from 'react-router';
import { useEffect } from 'react';
import { CirclePlusIcon } from 'lucide-react';
import ReviewCard from '~/components/Cards/ReviewCard';

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const reviews = await getFilteredReviews(userId, q);
  return { reviews, q };
}

export default function Reviews({ loaderData }: Route.ComponentProps) {
  const { reviews, q } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    const searchField = document.getElementById('q');
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || '';
    }
  }, [q]);

  return (
    <main className="flex flex-col items-center justify-center max-w-5xl mt-8">
      <div>
        <h1 className="mb-8 text-4xl font-bold">Reviews</h1>
      </div>
      <div
        className={
          navigation.state === 'loading' && !searching
            ? 'loading flex items-center'
            : 'flex items-center'
        }
      >
        <Form
          id="search-form"
          role="search"
          onChange={(event) => {
            const isFirstSearch = q === null;
            submit(event.currentTarget, {
              replace: !isFirstSearch,
            });
          }}
        >
          <input
            type="search"
            id="q"
            name="search"
            aria-label="Search reviews"
            placeholder="Search..."
            defaultValue={q || ''}
            className={
              searching
                ? 'loading w-full px-4 py-2 border rounded-lg'
                : 'w-full px-4 py-2 border rounded-lg'
            }
          />
        </Form>
        <Link to={`/reviews/new`} className="mx-2">
          <span className="p-4 text-white bg-blue-500 rounded-xl">
            New Review <CirclePlusIcon className="inline-block" />
          </span>
        </Link>
      </div>
      {/* FILTER AREA */}
      <div></div>
      <ul className="max-w-2xl space-y-4">
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} bottle={review.bottle!} />
          </li>
        ))}
      </ul>
    </main>
  );
}
