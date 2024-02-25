import {
  isRouteErrorResponse,
  useFetcher,
  useRouteError,
} from "@remix-run/react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import ActionBar from "~/components/Table/ActionBar";
import ItemActions from "~/components/Table/ItemActions";
import PageLimit from "~/components/Table/PageLimit";
// import Pagination from "~/components/Table/Pagination";
import Pagination from "~/components/Table/Pagination";
import Tabs from "~/components/Table/Tabs";
import { TableBottle } from "~/types/bottle";
import { Limit } from "~/types/table";
import useDebounce from "~/utils/useDebounce";

import { BottleSearchData } from "./api.search-bottles";

const helper = createColumnHelper<TableBottle>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<TableBottle, any>[] = [
  helper.accessor("name", {
    header: "Name",
  }),
  helper.accessor("createdAt", {
    header: "Added",
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
  }),
  helper.accessor("type", {
    header: "Type",
  }),
  helper.accessor("distiller", {
    header: "Distiller",
    cell: (props) => <span>{props.renderValue()}</span>,
  }),
  helper.accessor("producer", {
    header: "Producer",
    cell: (props) => <span>{props.renderValue()}</span>,
  }),
  helper.accessor("price", {
    header: "Price",
    cell: (props) => <span>${props.renderValue()}</span>,
  }),
  helper.accessor("alcoholPercent", {
    header: "ABV",
    cell: (props) => <span>{props.renderValue()}%</span>,
  }),
  helper.accessor("country", {
    header: "Country",
    cell: (props) => <span>{props.renderValue()}</span>,
  }),
  helper.accessor("region", {
    header: "Region",
    cell: (props) => <span>{props.renderValue()}</span>,
  }),
  helper.accessor("year", {
    header: "Year",
    cell: (props) => <span>{props.renderValue()}</span>,
  }),
  helper.accessor("id", {
    id: "actions",
    header: "Actions",
    cell: (props) => <ItemActions value={props.getValue()} />,
  }),
];

export default function Test() {
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 300);
  const [limit, setLimit] = useState<Limit>(10);
  const [page, setPage] = useState(0);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const tabOptions = useMemo(
    () => [
      { id: "all", label: "All" },
      { id: "opened", label: "Opened" },
      { id: "closed", label: "Closed" },
      { id: "finished", label: "Finished" },
    ],
    [],
  );

  const { load, data } = useFetcher<BottleSearchData>();

  const bottles = useMemo(() => {
    return data?.bottles || [];
  }, [data]);

  const table = useReactTable({
    data: bottles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    load(`/api/search-bottles?query=&limit=${limit}&page=0`);
  }, [load, limit]);

  useEffect(() => {
    load(`/api/search-bottles?query=${searchTerm}&limit=${limit}&page=${page}`);
  }, [load, searchTerm, limit, page]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="m-6 text-3xl underline place-self-start">Bottles</h1>
      <div className="w-10/12 flex flex-col shadow-lg p-4 m-4 rounded bg-gray-100">
        <Tabs tabOptions={tabOptions} />
        <ActionBar query={query} handleQueryChange={handleQueryChange} />
        <table
          aria-labelledby="caption"
          className="table w-full border-collapse overflow-x-scroll"
        >
          <caption className="sr-only">Table</caption>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} scope="col" className="p-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-gray-50 bg-gray-200 hover:bg-blue-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <PageLimit limit={limit} setLimit={setLimit} />
        </div>
        <Pagination
          page={page}
          setPage={(nextPage) => setPage(nextPage)}
          totalItems={data?.bottleCount || 0}
          totalPages={data?.totalPages || 0}
          onFirst={() => setPage(0)}
          onLast={() => setPage(data?.totalPages || 0)}
        />
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
