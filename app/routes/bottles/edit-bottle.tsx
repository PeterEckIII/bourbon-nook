import { Form, redirect, useNavigate } from 'react-router';
import type { Route } from './+types/edit-bottle';
import prisma from '~/lib/prisma';
import TextEditInput from '~/components/TextEditInput';

export async function loader({ params }: Route.LoaderArgs) {
  const { bottleId } = params;
  const bottle = await prisma.bottle.findUniqueOrThrow({
    where: { id: bottleId },
    include: {
      user: true,
    },
  });

  return { bottle };
}

export async function action({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  // await prisma.bottle.update(params)
  return redirect(`/bottles/${params.bottleId}`);
}

export default function EditBottle({ loaderData }: Route.ComponentProps) {
  const { bottle } = loaderData;
  const navigate = useNavigate();
  return (
    <Form method="post" className="space-y-6">
      <input type="hidden" name="userId" value={bottle.user.id} />
      <TextEditInput
        name="name"
        type="text"
        label="Bottle Name"
        value={bottle.name}
        placeholder="Cooper's Craft"
      />
      <TextEditInput
        name="type"
        type="text"
        label="Liquor Type"
        value={bottle.type}
        placeholder="Bourbon, Rye, Scotch"
      />
      <TextEditInput
        name="status"
        type="text"
        label="Bottle Status"
        value={bottle.status}
        placeholder="SEALED, OPENED, FINISHED"
      />
      <TextEditInput
        name="distiller"
        type="text"
        label="Distillery"
        value={bottle.distiller || ''}
        placeholder="MGP, Buffalo Trace"
      />
      <TextEditInput
        name="producer"
        type="text"
        label="Producer"
        value={bottle.producer || ''}
        placeholder="Sazerac, Heaven Hill"
      />
      <TextEditInput
        name="country"
        type="text"
        label="Country of Origin"
        value={bottle.country || ''}
        placeholder="USA, Japan, Scotland"
      />
      <TextEditInput
        name="region"
        type="text"
        label="Region"
        value={bottle.region || ''}
        placeholder="KY, Islay"
      />
      <TextEditInput
        name="price"
        type="text"
        label="Price"
        value={bottle.price || ''}
        placeholder="44.99"
      />
      <TextEditInput
        name="age"
        type="text"
        label="Age"
        value={bottle.age || ''}
        placeholder="12yr, NAS"
      />
      <TextEditInput
        name="proof"
        type="text"
        label="Proof"
        value={bottle.proof || ''}
        placeholder="100"
      />
      <TextEditInput
        name="year"
        type="text"
        label="Release Year"
        value={bottle.year || ''}
        placeholder="2021"
      />
      <TextEditInput
        name="barrel"
        type="text"
        label="Barrel Info"
        value={bottle.barrel || ''}
        placeholder="C920, OBSK, Binny's"
      />
      <TextEditInput
        name="finishing"
        type="text"
        label="Finishing Casks"
        value={bottle.finishing || ''}
        placeholder="Toasted, Cognac, Port"
      />
      <TextEditInput
        name="openDate"
        type="text"
        label="Date Opened"
        value={bottle.openDate || ''}
        placeholder="5/25/2023"
      />
      <TextEditInput
        name="killDate"
        type="text"
        label="Date Finished"
        value={bottle.killDate || ''}
        placeholder="N/A, 5/25/2023"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
      >
        Save
      </button>
      <button onClick={() => navigate(-1)} type="button">
        Cancel
      </button>
    </Form>
  );
}
