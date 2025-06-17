import { data, Form } from 'react-router';
import type { Route } from './+types/bottle';
import prisma from '~/lib/prisma';
import { Trash } from 'lucide-react';

export async function loader({ params }: Route.LoaderArgs) {
  const { bottleId } = params;
  const bottle = await prisma.bottle.findUnique({
    where: { id: bottleId },
    include: {
      user: true,
    },
  });

  if (!bottle) {
    throw data('Bottle Not Found', { status: 404 });
  }

  return { bottle };
}

export default function Bottle({ loaderData }: Route.ComponentProps) {
  const { bottle } = loaderData;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8">{bottle.name}</h1>
        <img src={bottle.imageUrl as string} alt={`Bottle of ${bottle.name}`} />
        <p className="text-gray-600 text-center">
          owner: {bottle.user.username}
        </p>
        <div className="prose prose-gray mt-8">{bottle.distiller}</div>
      </article>
      <aside>
        <Form
          action="destroy"
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              'Are you sure you want to delete this bottle?'
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">
            <Trash className="size-6" />
          </button>
        </Form>
      </aside>
    </div>
  );
}
