/* eslint-disable @typescript-eslint/no-explicit-any */
import { type LoaderFunctionArgs } from "@remix-run/node";
import {
  useFetcher,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  RefObject,
} from "react";

import ActionBar from "~/components/Table/ActionBar";
import MyTable from "~/components/Table/GenericTable";
import IndeterminateCheckbox from "~/components/Table/IndeterminateCheckbox";
import ItemActions from "~/components/Table/ItemActions";
import Pagination from "~/components/Table/Pagination/Pagination";
import { requireUserId } from "~/session.server";
import { TableReview } from "~/types/review";
import useDebounce from "~/utils/useDebounce";
import { useEventListener } from "~/utils/useEventListener";

import { ReviewSearchData } from "./api.search-reviews";

const helper = createColumnHelper<TableReview>();

const columns: ColumnDef<TableReview, any>[] = [
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
          }}
        />
      </div>
    ),
    enableResizing: false,
    enableHiding: false,
  }),
  helper.accessor("bottle.name", {
    id: "bottle.name",
    header: "Bottle",
    cell: ({ cell }) => <div>{cell.renderValue()}</div>,
    footer: (props) => props.column.id,
    enableResizing: true,
    enableHiding: false,
  }),
  helper.accessor("date", {
    id: "date",
    header: "Date",
    cell: ({ cell }) => <div>{cell.renderValue()}</div>,
    footer: (props) => props.column.id,
  }),
  helper.accessor("bottle.status", {
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

  helper.accessor("overallRating", {
    id: "overallRating",
    header: "Rating",
    cell: ({ cell }) => <div>{cell.renderValue()}</div>,
    footer: (props) => props.column.id,
    enableHiding: false,
    enableResizing: false,
  }),
  helper.accessor("value", {
    id: "value",
    header: "Value for Money",
    cell: ({ cell }) => <div>{cell.renderValue()}</div>,
    footer: (props) => props.column.id,
    enableHiding: false,
    enableResizing: false,
  }),

  helper.accessor("id", {
    id: "actions",
    header: "Actions",
    cell: ({ cell }) => <ItemActions value={cell.getValue()} />,
    footer: (props) => props.column.id,
    enableResizing: false,
    enableHiding: false,
  }),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return null;
};

export default function ReviewIndexRoute() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 300);
  const [tableHeight, setTableHeight] = useState<number | string>("auto");
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTableHeight(tableRef.current?.offsetHeight || "auto");
  }, []);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { load, data, state } = useFetcher<ReviewSearchData>();

  const reviews = useMemo(() => {
    return data?.reviews || [];
  }, [data]);

  const isEmpty = state === "idle" && reviews.length === 0;

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
    data: reviews,
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
    load(
      `/api/search-reviews?query=&limit=${pagination.pageSize}&page=${pagination.pageIndex}`,
    );
  }, [load, pagination]);

  useEffect(() => {
    load(
      `/api/search-reviews?query=${searchTerm}&limit=${pagination.pageSize}&page=${pagination.pageIndex}`,
    );
  }, [load, searchTerm, pagination]);

  return (
    <main className="flex flex-col items-center">
      <div className="w-10/12 flex flex-col justify-between shadow-lg p-4 m-4 rounded bg-gray-100">
        <ActionBar<TableReview>
          query={query}
          handleQueryChange={handleQueryChange}
          getAllColumns={getAllColumns}
          setPageSize={setPageSize}
          pageSize={pagination.pageSize}
        />
        <MyTable<TableReview>
          getState={getState}
          getFlatHeaders={getFlatHeaders}
          getTotalSize={getTotalSize}
          getHeaderGroups={getHeaderGroups}
          getRowModel={getRowModel}
          isEmpty={isEmpty}
          page={pagination.pageIndex}
          totalItems={data?.reviewCount || 0}
          totalPages={data?.totalPages || 0}
          tableRef={tableRef as RefObject<HTMLTableElement>}
          tableHeight={tableHeight}
        />
        <Pagination
          pageIndex={pagination.pageIndex}
          resultsShown={reviews.length}
          itemCount={data?.reviewCount || 0}
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
