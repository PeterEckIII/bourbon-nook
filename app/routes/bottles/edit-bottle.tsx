import { Form, redirect } from 'react-router';
import type { Route } from './+types/edit-bottle';
import prisma from '~/lib/prisma';

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
  const updates = Object.fromEntries(formData);
  // await prisma.bottle.update(params)
  return redirect(`/bottles/${params.bottleId}`);
}

export default function EditBottle({ loaderData }: Route.ComponentProps) {
  const { bottle } = loaderData;
  return (
    <Form method="post" className="space-y-6">
      <input type="hidden" name="userId" value={bottle.user.id} />
      <div>
        <label htmlFor="name" className="block text-lg mb-2">
          Name
        </label>
        <input
          type="text"
          value={bottle.name}
          name="name"
          id="name"
          placeholder="Enter your bottle name"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="type" className="block text-lg mb-2">
          Type
        </label>
        <input
          type="text"
          value={bottle.type}
          name="type"
          id="type"
          placeholder="Enter the type of liquor"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-lg mb-2">
          Status
        </label>
        <input
          type="text"
          value={bottle.status}
          name="status"
          id="status"
          placeholder="Enter the status of the bottle"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="distiller" className="block text-lg mb-2">
          Distiller
        </label>
        <input
          type="text"
          value={bottle.distiller || ''}
          name="distiller"
          id="distiller"
          placeholder="Enter the bottle distiller"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="producer" className="block text-lg mb-2">
          Producer
        </label>
        <input
          type="text"
          value={bottle.producer || ''}
          name="producer"
          id="producer"
          placeholder="Enter the bottle producer"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="country" className="block text-lg mb-2">
          Country
        </label>
        <input
          type="text"
          value={bottle.country || ''}
          name="country"
          id="country"
          placeholder="Enter the country of origin"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="region" className="block text-lg mb-2">
          Region
        </label>
        <input
          type="text"
          value={bottle.region || ''}
          name="region"
          id="region"
          placeholder="Enter the region of the bottle"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-lg mb-2">
          Price
        </label>
        <input
          type="text"
          value={bottle.price || ''}
          name="price"
          id="price"
          placeholder="Enter the price of the bottle"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-lg mb-2">
          Age
        </label>
        <input
          type="text"
          value={bottle.age || ''}
          name="age"
          id="age"
          placeholder="Enter the age of the bottle"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="proof" className="block text-lg mb-2">
          Proof
        </label>
        <input
          type="text"
          value={bottle.proof || ''}
          name="proof"
          id="proof"
          placeholder="Enter the proof of the bottle"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="year" className="block text-lg mb-2">
          Year
        </label>
        <input
          type="text"
          value={bottle.year || ''}
          name="year"
          id="year"
          placeholder="Enter the bottle year"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="barrel" className="block text-lg mb-2">
          Barrel Details
        </label>
        <input
          type="text"
          value={bottle.barrel || ''}
          name="barrel"
          id="barrel"
          placeholder="Enter the details of the barrel"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="finishing" className="block text-lg mb-2">
          Finishing
        </label>
        <input
          type="text"
          value={bottle.finishing || ''}
          name="finishing"
          id="finishing"
          placeholder="Enter any barrel finishes"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="openDate" className="block text-lg mb-2">
          Open Date
        </label>
        <input
          type="text"
          value={bottle.openDate || ''}
          name="openDate"
          id="openDate"
          placeholder="Enter the day you opened the bottle"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="killDate" className="block text-lg mb-2">
          Kill Date
        </label>
        <input
          type="text"
          value={bottle.killDate || ''}
          name="killDate"
          id="killDate"
          placeholder="Enter the day you finished the bottle"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
      >
        Save Updates
      </button>
    </Form>
  );
}
