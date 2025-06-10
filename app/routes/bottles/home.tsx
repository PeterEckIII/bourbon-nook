import type { Route } from '../+types/home';
import prisma from '~/lib/prisma';

export async function loader() {
  const bottles = await prisma.bottle.findMany({
    include: {
      user: true,
    },
  });
  return { bottles };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { bottles } = loaderData;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Bottles
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        {bottles.map((bottle) => (
          <li key={bottle.id}>
            <span className="font-semibold">{bottle.name}</span>{' '}
            <span className="text-sm text-gray-600 ml-2">
              by {bottle.user.username}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
