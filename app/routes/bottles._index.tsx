import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Outlet, Link } from "@remix-run/react";

import TableContainer from "~/components/Table/TableContainer";
import { getBottlesForTable } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { TableBottle, useBottleColumns } from "~/utils/useTableData";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  return json({
    bottles: await getBottlesForTable(userId),
  });
};

export default function Bottles() {
  const { bottles } = useLoaderData<typeof loader>();
  const columns = useBottleColumns();
  return (
    <main className="">
      <h1 className="text-3xl font-sans underline">Bottles</h1>
      <TableContainer<TableBottle>
        columns={columns}
        data={bottles}
        tabOptions={[
          { id: "all", label: "All" },
          { id: "opened", label: "Opened" },
          { id: "closed", label: "Closed" },
          { id: "finished", label: "Finished" },
        ]}
      />

      <div className="float-right">
        <Link to="/bottles/new">Add a Bottle</Link>
      </div>
      <Outlet />
    </main>
  );
}
