import type { Route } from './+types/review';
import { getReview } from '~/models/review';
import { getUserId } from '~/utils/session';
import { redirect } from 'react-router';
import { Trash } from 'lucide-react';

export async function loader({ params, request }: Route.LoaderArgs) {
  const { reviewId } = params;
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect(`/login?redirectTo=/reviews/${reviewId}`);
  }
  if (!reviewId) {
    throw new Error('Review not found');
  }
  const review = await getReview(userId, reviewId);
  return { review };
}

export default function Review({ loaderData }: Route.ComponentProps) {
  const { review } = loaderData;
  return (
    <div>
      <h1>{review?.bottle?.name}</h1> <Trash className="size-6" />
      <h2>Notes</h2>
      <div>{review?.nose}</div>
      <div>{review?.palate}</div>
      <div>{review?.finish}</div>
      <div>{review?.thoughts}</div>
    </div>
  );
}
