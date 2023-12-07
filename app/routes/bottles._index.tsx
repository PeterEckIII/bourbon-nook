import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Outlet, Link, Form } from "@remix-run/react";

import { getBottles } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  return json({
    bottles: await getBottles(userId),
  });
};

export default function Bottles() {
  const { bottles } = useLoaderData<typeof loader>();
  return (
    <main className="">
      <h1 className="text-3xl font-sans underline">Bottles</h1>
      <ul>
        {bottles.map((bottle) => (
          <li className="text-xl font-semibold" key={bottle.id}>
            <Link to={`/bottles/${bottle.id}`}>{bottle.name}</Link>
            <Link
              to={`/bottles/${bottle.id}/edit`}
              className="px-4 py-2 m-2 bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-black"
            >
              Edit
            </Link>
            <Form
              action={`${bottle.id}/delete`}
              method="post"
              onSubmit={(event) => {
                const response = confirm(
                  `Please confirm you want to delete ${bottle.name} from your collection`,
                );
                if (!response) {
                  event.preventDefault();
                }
              }}
            >
              <button
                className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md"
                type="submit"
              >
                Delete
              </button>
            </Form>
          </li>
        ))}
      </ul>
      <div className="float-right">
        <Link to="/bottles/new">Add a Bottle</Link>
      </div>
      <Outlet />
    </main>
  );
}
