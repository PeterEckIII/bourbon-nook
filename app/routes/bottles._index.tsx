import { type LoaderFunctionArgs, defer } from "@remix-run/node";
import { useLoaderData, Outlet, Link, Await } from "@remix-run/react";
import { Suspense } from "react";

import TableContainer from "~/components/Table/TableContainer";
import { getBottlesForTable } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { type TableBottle, useBottleColumns } from "~/utils/table-helpers";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  return defer({
    bottles: getBottlesForTable(userId),
  });
};

export default function Bottles() {
  const { bottles } = useLoaderData<typeof loader>();
  const columns = useBottleColumns();
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-sans underline">Bottles</h1>
      <Suspense fallback={<div>Fetching...</div>}>
        <Await resolve={bottles}>
          {(bottles) => (
            <TableContainer<TableBottle>
              columns={columns}
              data={bottles}
              tabOptions={[
                { id: "all", label: "All" },
                { id: "opened", label: "Opened" },
                { id: "closed", label: "Closed" },
                { id: "finished", label: "Finished" },
              ]}
              caption="Your Collection"
              summary="A collection of your spirits, organized by date"
            />
          )}
        </Await>
      </Suspense>

      <div className="float-right">
        <Link to="/bottles/new">Add a Bottle</Link>
      </div>
      <Outlet />
    </main>
  );
}
