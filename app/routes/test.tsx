/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunctionArgs, defer } from "@remix-run/node";
import {
  Await,
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Suspense, useMemo } from "react";

import IndeterminateCheckbox from "~/components/Table/IndeterminateCheckbox";
import ItemActions from "~/components/Table/ItemActions";
import SkeletonCell from "~/components/Table/SkeletonCell";
import Table from "~/components/Table/Table";
import { searchBottles } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { TableBottle } from "~/types/bottle";

const helper = createColumnHelper<TableBottle>();

const columns = [
  helper.accessor("id", {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
    footer: (props) => props.column.id,
    enableResizing: false,
    enableHiding: false,
  }),
  helper.accessor("name", {
    header: "Name",
    footer: (props) => props.column.id,
    enableResizing: true,
    enableHiding: false,
  }),
  helper.accessor("createdAt", {
    header: "Added on",
    cell: (props) => {
      const date = new Date(props.getValue());
      // @ts-expect-error Prisma is stupid -- date errors, but any casting of it to string crashes app
      const formattedDate = new Intl.DateTimeFormat(date, {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
      return <span>{formattedDate.format()}</span>;
    },
    footer: (props) => props.column.id,
    enableResizing: true,
  }),
  helper.accessor("status", {
    header: "Status",
    cell: (props) => {
      const val = props.getValue();
      switch (val) {
        case "CLOSED":
          return (
            <span className="mx-2 min-w-[125px] rounded-lg bg-yellow-500 bg-opacity-60 p-2 px-2 py-1 text-center text-yellow-700 ">
              {val}
            </span>
          );
        case "FINISHED":
          return (
            <span className="mx-2 min-w-[125px] rounded-lg bg-gray-300 bg-opacity-60 p-2 px-2 py-1 text-center text-gray-700">
              {val}
            </span>
          );
        case "OPENED":
          return (
            <span className="mx-2 min-w-[125px] rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-center text-green-700">
              {val}
            </span>
          );
        default:
          break;
      }
    },
    footer: (props) => props.column.id,
    enableResizing: false,
  }),
  helper.accessor("type", {
    header: "Type",
    footer: (props) => props.column.id,
    enableResizing: true,
  }),
  helper.accessor("distiller", {
    header: "Distiller",
    cell: (props) => <span>{props.renderValue()}</span>,
    footer: (props) => props.column.id,
    enableResizing: true,
  }),
  helper.accessor("producer", {
    header: "Producer",
    cell: (props) => <span>{props.renderValue()}</span>,
    footer: (props) => props.column.id,
    enableResizing: true,
  }),
  helper.accessor("price", {
    header: "Price",
    cell: (props) => <span>${props.renderValue()}</span>,
    footer: (props) => props.column.id,
    enableResizing: false,
  }),
  helper.accessor("alcoholPercent", {
    header: "ABV",
    cell: (props) => <span>{props.renderValue()}%</span>,
    footer: (props) => props.column.id,
    enableResizing: false,
  }),
  helper.accessor("country", {
    header: "Country",
    cell: (props) => <span>{props.renderValue()}</span>,
    footer: (props) => props.column.id,
    enableResizing: true,
  }),
  helper.accessor("region", {
    header: "Region",
    cell: (props) => <span>{props.renderValue()}</span>,
    footer: (props) => props.column.id,
    enableResizing: true,
  }),
  helper.accessor("year", {
    header: "Year",
    cell: (props) => <span>{props.renderValue()}</span>,
    footer: (props) => props.column.id,
    enableResizing: false,
  }),
  helper.accessor("id", {
    id: "actions",
    header: "Actions",
    cell: (props) => <ItemActions value={props.getValue()} />,
    footer: (props) => props.column.id,
    enableResizing: false,
    enableHiding: false,
  }),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  setTimeout(() => {
    return;
  }, 3000);
  const bottlePromise = searchBottles(userId, "", 0, 10);
  return defer({
    bottles: bottlePromise,
  });
};

export default function TestRoute() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const cols = useMemo(
    () =>
      navigation.state === "loading"
        ? columns.map((column) => ({
            ...column,
            cell: () => <SkeletonCell />,
          }))
        : columns,
    [navigation.state],
  );

  // const tableData = useMemo(
  //   () => (navigation.state === "loading" ? Array(10).fill({}) : data.bottles),
  //   [navigation.state, data.bottles],
  // ) as TableBottle[];

  return (
    <main className="flex flex-col items-center">
      <div className="w-10/12 flex flex-col justify-between shadow-lg p-4 m-4 rounded bg-gray-100">
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={data.bottles}
            errorElement={
              <div className="text-red-500">Oops! Something went wrong!</div>
            }
          >
            {(bottles) => <Table data={bottles} columns={cols} />}
          </Await>
        </Suspense>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    error.status = 500;
    error.data = "Error finding bottles";
    return (
      <div className="m-4 p-4 border border-red-500 flex items-center justify-center flex-col">
        <div>
          <h2 className="text-2xl text-red-500">Error!</h2>
        </div>
        <div>
          <p className="text-lg text-black">Try reloading the window</p>
        </div>
      </div>
    );
  }
}
