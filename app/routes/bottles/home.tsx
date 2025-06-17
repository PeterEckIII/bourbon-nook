import { getBottlesForUser } from '~/models/bottle';
import type { Route } from './+types/home';
import { requireUserId } from '~/utils/session';
import { Link } from 'react-router';
import { PlusCircle } from 'lucide-react';

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  const bottles = await getBottlesForUser(userId);
  return { bottles };
}

export default function Bottles({ loaderData }: Route.ComponentProps) {
  const { bottles } = loaderData;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <div>
        <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
          Bottles
        </h1>
        <Link to="new">
          <PlusCircle className="size-6" />
        </Link>
      </div>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        {bottles.map((bottle) => (
          <li key={bottle.id}>
            <Link className="font-semibold" to={`/bottles/${bottle.id}`}>
              {bottle.name}
            </Link>
            <span className="text-sm text-gray-600 ml-2">
              {bottle.distiller}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
