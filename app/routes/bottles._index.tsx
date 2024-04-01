/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useFetcher,
  useRouteError,
} from "@remix-run/react";
import {
  ColumnDef,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChangeEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ActionBar from "~/components/Table/ActionBar";
import MyTable from "~/components/Table/GenericTable";
import IndeterminateCheckbox from "~/components/Table/IndeterminateCheckbox";
import ItemActions from "~/components/Table/ItemActions";
import Pagination from "~/components/Table/Pagination/Pagination";
import { requireUserId } from "~/session.server";
import { TableBottle } from "~/types/bottle";
import useDebounce from "~/utils/useDebounce";
import { useEventListener } from "~/utils/useEventListener";

import { BottleSearchData } from "./api.search-bottles";

const helper = createColumnHelper<TableBottle>();

const columns: ColumnDef<TableBottle, any>[] = [
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
      const val = props.getValue();
      if (val) {
        const date = new Date(val);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        });
        return <span>{formattedDate.format(date)}</span>;
      }
      return <span>null</span>;
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
  await requireUserId(request);
  return {};
};

export default function BottleIndexRoute() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 300);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [tableHeight, setTableHeight] = useState<string | number>("auto");
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    setTableHeight(tableRef.current?.offsetHeight || "auto");
  }, []);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { load, data, state } = useFetcher<BottleSearchData>();

  const bottles = useMemo(() => {
    return data?.bottles || [];
  }, [data]);

  const isEmpty = state === "idle" && bottles.length === 0;

  useEventListener("keydown", (event) => {
    if (event.key === "Tab" && rowSelection && setRowSelection) {
      event.preventDefault();

      const selectionKeys = Object.entries(rowSelection)
        .filter(([, value]) => value)
        .map(([key]) => Number(key));

      const start = Math.min(...selectionKeys);
      const end = Math.max(...selectionKeys);

      const newSelection = {} as Record<string, true>;
      for (let i = start; i <= end; i += 1) {
        newSelection[i] = true;
      }

      setRowSelection(newSelection);
    }
  });

  const {
    getHeaderGroups,
    getFlatHeaders,
    getRowModel,
    getTotalSize,
    getState,
    getAllColumns,
    getPageCount,
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    setPageIndex,
    setPageSize,
  } = useReactTable({
    data: bottles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
    pageCount: data?.totalPages || 0,
    manualPagination: true,
    state: {
      rowSelection,
      columnVisibility,
      sorting,
      pagination,
    },
  });

  useEffect(() => {
    load(`/api/search-bottles?query=&limit=${pagination.pageSize}&page=0`);
  }, [load, pagination]);

  useEffect(() => {
    load(
      `/api/search-bottles?query=${searchTerm}&limit=${pagination.pageSize}&page=${pagination.pageIndex}`,
    );
  }, [load, searchTerm, pagination]);

  return (
    <main className="flex flex-col items-center">
      <div className="w-10/12 flex flex-col justify-between shadow-lg p-4 m-4 rounded bg-gray-100">
        <ActionBar<TableBottle>
          query={query}
          handleQueryChange={handleQueryChange}
          getAllColumns={getAllColumns}
          setPageSize={setPageSize}
          pageSize={pagination.pageSize}
        />
        <MyTable<TableBottle>
          getState={getState}
          getFlatHeaders={getFlatHeaders}
          getTotalSize={getTotalSize}
          getHeaderGroups={getHeaderGroups}
          getRowModel={getRowModel}
          isEmpty={isEmpty}
          page={pagination.pageIndex}
          totalItems={data?.bottleCount || 0}
          totalPages={data?.totalPages || 0}
          tableRef={tableRef as RefObject<HTMLTableElement>}
          tableHeight={tableHeight}
        />
        <Pagination
          pageIndex={pagination.pageIndex}
          resultsShown={bottles.length}
          itemCount={data?.bottleCount || 0}
          setPageIndex={setPageIndex}
          getCanPreviousPage={getCanPreviousPage}
          previousPage={previousPage}
          getCanNextPage={getCanNextPage}
          nextPage={nextPage}
          getPageCount={getPageCount}
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
