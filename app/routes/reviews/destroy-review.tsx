import { redirect } from 'react-router';
import type { Route } from './+types/destroy-review';

import { deleteReview } from '~/models/review';

export async function action({ params }: Route.ActionArgs) {
  await deleteReview(params.reviewId);
  return redirect('/reviews');
}
