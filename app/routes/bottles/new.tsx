import type { Route } from './+types/new';
import { redirect } from 'react-router';
import { requireUserId } from '~/utils/session';
import BottleForm from '~/components/BottleForm';
import { createBottle } from '~/models/bottle';

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  return { userId };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get('userId') as string;
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const status = formData.get('status') as string;
  const distiller = formData.get('distiller') as string;
  const producer = formData.get('producer') as string;
  const country = formData.get('country') as string;
  const region = formData.get('region') as string;
  const price = formData.get('price') as string;
  const age = formData.get('age') as string;
  const proof = formData.get('proof') as string;
  const year = formData.get('year') as string;
  const barrel = formData.get('barrel') as string;
  const finishing = formData.get('finishing') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const openDate = formData.get('openDate') as string;
  const killDate = formData.get('killDate') as string;

  try {
    const bottle = await createBottle({
      userId,
      name,
      type,
      status,
      distiller,
      producer,
      country,
      region,
      price,
      age,
      proof,
      year,
      barrel,
      finishing,
      imageUrl,
      openDate,
      killDate,
    });
    return redirect(`/bottles/${bottle.id}/image`);
  } catch (error) {
    return Response.json(
      { error: 'Failed to create bottle ' },
      { status: 500 }
    );
  }
}

export default function NewBottle({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Bottle</h1>
      <BottleForm userId={userId} />
    </div>
  );
}
