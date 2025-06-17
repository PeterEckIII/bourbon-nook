import { requireUserId } from '~/utils/session';
import type { Route } from './+types/edit-review';
import { getReview } from '~/models/review';
import { Form } from 'react-router';

export async function loader({ params, request }: Route.LoaderArgs) {
  const { reviewId } = params;
  const userId = await requireUserId(
    request,
    `/login?redirectTo=/reviews/${reviewId}`
  );

  const review = await getReview(userId, reviewId);

  return { review };
}

export default function EditReview({ loaderData }: Route.ComponentProps) {
  const { review } = loaderData;

  return (
    <Form method="post">
      <input type="text" name="date" id="date" value={review?.date || ''} />
    </Form>
  );
}
