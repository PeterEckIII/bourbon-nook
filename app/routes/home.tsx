import type { Route } from './+types/home';
import prisma from '~/lib/prisma';

export async function loader() {
  const users = await prisma.user.findMany();
  return { users };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData;
  return (
    <main className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-4xl font-bold mb-8">Bourbon Nook</h1>
      <ol className="list-decimal list-inside">
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ol>
    </main>
  );
}
