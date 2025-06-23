import { Form, redirect } from 'react-router';
import type { Route } from '../reviews/+types/new';
import { requireUserId } from '~/utils/session';
import { createReview } from '~/models/review';
import TextInput from '~/components/Inputs/TextInput';
import TextareaInput from '~/components/Inputs/TextareaInput';

export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);
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
  return (
    <Form method="post">
      {/* <input type="hidden" name="bottleId" value={bottleId} id="bottleId" /> */}
      <TextInput
        type="text"
        name="date"
        id="date"
        label="Review date"
        placeholder="5/25/2024"
      />
      <TextInput
        type="text"
        name="setting"
        id="setting"
        label="Review setting"
        placeholder="Having a drink before going out for dinner"
      />
      <TextInput
        type="text"
        name="glassware"
        id="glassware"
        label="Glassware"
        placeholder="Glencairn, rocks glass"
      />
      <TextInput
        type="text"
        name="restTime"
        id="restTime"
        label="Rest time"
        placeholder="15min"
      />
      <TextareaInput
        name="nose"
        id="nose"
        label="Nose"
        placeholder="Enter your nose notes here"
        rows={6}
      />
      <TextareaInput
        name="palate"
        id="palate"
        label="Palate"
        placeholder="Enter your palate notes here"
        rows={6}
      />
      <TextareaInput
        name="finish"
        id="finish"
        label="Finish"
        placeholder="Enter your finish notes here"
        rows={6}
      />
      <TextareaInput
        name="thoughts"
        id="thoughts"
        label="Final thoughts"
        placeholder="Enter your thoughts notes here"
        rows={6}
      />
      <input type="text" name="value" id="value" />
      <input type="text" name="overallRating" id="overallRating" />
    </Form>
  );
}
