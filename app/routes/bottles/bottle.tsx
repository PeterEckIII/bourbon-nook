import { data, Form } from 'react-router';
import type { Route } from './+types/bottle';
import prisma from '~/lib/prisma';
import Bottle from '~/components/UI/Bottle';
import { Trash } from 'lucide-react';
import BottleActions from '~/components/UI/BottleActions';

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

export default function BottlePage({ loaderData }: Route.ComponentProps) {
  const { bottle } = loaderData;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <Bottle bottle={bottle} />
        <BottleActions />
      </article>
    </div>
  );
}
