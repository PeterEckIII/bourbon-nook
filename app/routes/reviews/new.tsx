import { Form, redirect } from 'react-router';
import type { Route } from '../reviews/+types/new';
import { requireUserId } from '~/utils/session';
import { createReview } from '~/models/review';

export async function loader({ params, request }: Route.LoaderArgs) {
  const { bottleId } = params;
  const userId = await requireUserId(request);
  return bottleId;
}

export async function action({ request }: Route.ActionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const date = formData.get('date') as string;
  const setting = formData.get('setting') as string;
  const glassware = formData.get('glassware') as string;
  const restTime = formData.get('restTime') as string;
  const nose = formData.get('nose') as string;
  const palate = formData.get('palate') as string;
  const finish = formData.get('finish') as string;
  const thoughts = formData.get('thoughts') as string;
  const value = formData.get('value') as string;
  const overallRating = formData.get('overallRating') as string;

  const numericValue = parseInt(value);
  const numericRating = parseInt(overallRating);

  const newReview = await createReview({
    userId,
    bottleId: '',
    date,
    setting,
    glassware,
    restTime,
    nose,
    palate,
    finish,
    thoughts,
    value: numericValue,
    overallRating: numericRating,
  });
  return redirect(`/reviews/${newReview.id}`);
}

export default function NewReview({ loaderData }: Route.ComponentProps) {
  const { bottleId } = loaderData;
  return (
    <Form method="post">
      <input type="hidden" name="bottleId" value={bottleId} id="bottleId" />
      <input type="text" name="date" id="date" />
      <input type="text" name="setting" id="setting" />
      <input type="text" name="glassware" id="glassware" />
      <input type="text" name="restTime" id="restTime" />
      <textarea
        name="nose"
        id="nose"
        rows={6}
        placeholder="Enter your nose notes here"
      />
      <textarea
        name="palate]"
        id="palate"
        rows={6}
        placeholder="Enter your  palate notes here"
      />
      <textarea
        name="finish"
        id="finish"
        rows={6}
        placeholder="Enter your finish notes here"
      />
      <textarea
        name="thoughts"
        id="thoughts"
        rows={6}
        placeholder="Enter your thoughts here"
      />
      <input type="text" name="value" id="value" />
      <input type="text" name="overallRating" id="overallRating" />
    </Form>
  );
}
