import prisma from '~/lib/prisma';
import type { Route } from './+types/new';
import { Form, redirect } from 'react-router';

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

  const data = Object.fromEntries(formData);
  try {
    await prisma.bottle.create({
      data: {
        userId: '',
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
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to create bottle ' },
      { status: 500 }
    );
  }

  return redirect('/bottles');
}

export default function NewBottle() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Bottle</h1>
      <Form method="post" className="space-y-6">
        {/* <input type="hidden" name="userId" value={user.id} /> */}
        <div>
          <label htmlFor="name" className="block text-lg mb-2">
            Name
          </label>
          <input
            type="text"
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
          Create Bottle
        </button>
      </Form>
    </div>
  );
}
