// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import { Await, useLoaderData } from "@remix-run/react";
// import {
//   ColumnDef,
//   RowSelectionState,
//   VisibilityState,
//   createColumnHelper,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   ChangeEvent,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   Suspense,
// } from "react";

// import IndeterminateCheckbox from "~/components/Table/IndeterminateCheckbox";
// import ItemActions from "~/components/Table/ItemActions";
// import SkeletonCell from "~/components/Table/SkeletonCell";
// import { searchBottles } from "~/models/bottle.server";
// import { requireUserId } from "~/session.server";
// import { TableBottle } from "~/types/bottle";
// import { Limit } from "~/types/table";
// import useDebounce from "~/utils/useDebounce";
// import { useEventListener } from "~/utils/useEventListener";

// import { BottleSearchData } from "./api.search-bottles";

// type Empty = Record<string, never>;

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const userId = await requireUserId(request);
//   const url = new URL(request.url);
//   const query = url.searchParams.get("query")?.toLowerCase() || "";
//   const limit = Number(url.searchParams.get("limit"));
//   const page = Number(url.searchParams.get("page"));
//   const offset = page * limit;

//   try {
//     const bottles = await searchBottles(userId, query, offset, limit);
//     const bottleCount = bottles.length;

//     const totalPages = Math.ceil(bottleCount / limit);

//     return json<BottleSearchData>({
//       bottles,
//       bottleCount,
//       totalPages,
//     });
//   } catch (e) {
//     return json<BottleSearchData>({
//       bottles: [],
//       bottleCount: 0,
//       totalPages: 0,
//       error: `Error finding bottles with query ${query} -- Msg: ${e}`,
//     });
//   }
// };

// const helper = createColumnHelper<TableBottle | Empty>();

// const columns: ColumnDef<TableBottle | Empty, any>[] = [
//   helper.accessor("id", {
//     id: "select",
//     header: ({ table }) => (
//       <IndeterminateCheckbox
//         {...{
//           checked: table.getIsAllRowsSelected(),
//           indeterminate: table.getIsSomeRowsSelected(),
//           onChange: table.getToggleAllRowsSelectedHandler(),
//         }}
//       />
//     ),
//     cell: ({ row }) => (
//       <div className="px-1">
//         <IndeterminateCheckbox
//           {...{
//             checked: row.getIsSelected(),
//             disabled: !row.getCanSelect(),
//             indeterminate: row.getIsSomeSelected(),
//             onChange: row.getToggleSelectedHandler(),
//           }}
//         />
//       </div>
//     ),
//     footer: (props) => props.column.id,
//     enableResizing: false,
//     enableHiding: false,
//   }),
//   helper.accessor("name", {
//     header: "Name",
//     footer: (props) => props.column.id,
//     enableResizing: true,
//     enableHiding: false,
//   }),
//   helper.accessor("createdAt", {
//     header: "Added on",
//     cell: (props) => {
//       const date = new Date(props.getValue());
//       // @ts-expect-error Prisma is stupid -- date errors, but any casting of it to string crashes app
//       const formattedDate = new Intl.DateTimeFormat(date, {
//         month: "2-digit",
//         day: "2-digit",
//         year: "2-digit",
//       });
//       return <span>{formattedDate.format()}</span>;
//     },
//     footer: (props) => props.column.id,
//     enableResizing: true,
//   }),
//   helper.accessor("status", {
//     header: "Status",
//     cell: (props) => {
//       const val = props.getValue();
//       switch (val) {
//         case "CLOSED":
//           return (
//             <span className="mx-2 min-w-[125px] rounded-lg bg-yellow-500 bg-opacity-60 p-2 px-2 py-1 text-center text-yellow-700 ">
//               {val}
//             </span>
//           );
//         case "FINISHED":
//           return (
//             <span className="mx-2 min-w-[125px] rounded-lg bg-gray-300 bg-opacity-60 p-2 px-2 py-1 text-center text-gray-700">
//               {val}
//             </span>
//           );
//         case "OPENED":
//           return (
//             <span className="mx-2 min-w-[125px] rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-center text-green-700">
//               {val}
//             </span>
//           );
//         default:
//           break;
//       }
//     },
//     footer: (props) => props.column.id,
//     enableResizing: false,
//   }),
//   helper.accessor("type", {
//     header: "Type",
//     footer: (props) => props.column.id,
//     enableResizing: true,
//   }),
//   helper.accessor("distiller", {
//     header: "Distiller",
//     cell: (props) => <span>{props.renderValue()}</span>,
//     footer: (props) => props.column.id,
//     enableResizing: true,
//   }),
//   helper.accessor("producer", {
//     header: "Producer",
//     cell: (props) => <span>{props.renderValue()}</span>,
//     footer: (props) => props.column.id,
//     enableResizing: true,
//   }),
//   helper.accessor("price", {
//     header: "Price",
//     cell: (props) => <span>${props.renderValue()}</span>,
//     footer: (props) => props.column.id,
//     enableResizing: false,
//   }),
//   helper.accessor("alcoholPercent", {
//     header: "ABV",
//     cell: (props) => <span>{props.renderValue()}%</span>,
//     footer: (props) => props.column.id,
//     enableResizing: false,
//   }),
//   helper.accessor("country", {
//     header: "Country",
//     cell: (props) => <span>{props.renderValue()}</span>,
//     footer: (props) => props.column.id,
//     enableResizing: true,
//   }),
//   helper.accessor("region", {
//     header: "Region",
//     cell: (props) => <span>{props.renderValue()}</span>,
//     footer: (props) => props.column.id,
//     enableResizing: true,
//   }),
//   helper.accessor("year", {
//     header: "Year",
//     cell: (props) => <span>{props.renderValue()}</span>,
//     footer: (props) => props.column.id,
//     enableResizing: false,
//   }),
//   helper.accessor("id", {
//     id: "actions",
//     header: "Actions",
//     cell: (props) => <ItemActions value={props.getValue()} />,
//     footer: (props) => props.column.id,
//     enableResizing: false,
//     enableHiding: false,
//   }),
// ];

// export default function TestRoute() {
//   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
//   const [query, setQuery] = useState("");
//   const searchTerm = useDebounce(query, 300);
//   const [limit, setLimit] = useState<Limit>(10);
//   const [page, setPage] = useState(0);
//   const [tableHeight, setTableHeight] = useState<string | number>("auto");
//   const tableRef = useRef<HTMLTableElement | null>(null);

//   useEffect(() => {
//     setTableHeight(tableRef.current?.offsetHeight || "auto");
//   }, []);

//   const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   useEventListener("keydown", (event) => {
//     if (event.key === "Tab" && rowSelection && setRowSelection) {
//       event.preventDefault();

//       const selectionKeys = Object.entries(rowSelection)
//         .filter(([, value]) => value)
//         .map(([key]) => Number(key));

//       const start = Math.min(...selectionKeys);
//       const end = Math.max(...selectionKeys);

//       const newSelection = {} as Record<string, true>;
//       for (let i = start; i <= end; i += 1) {
//         newSelection[i] = true;
//       }

//       setRowSelection(newSelection);
//     }
//   });

//   useEffect(() => {
//     load(`/api/search-bottles?query=${searchTerm}&limit=${limit}&page=${page}`);
//   }, [load, searchTerm, limit, page]);

//   const {
//     getHeaderGroups,
//     getFlatHeaders,
//     getRowModel,
//     getTotalSize,
//     getState,
//     getAllColumns,
//   } = useReactTable({
//     data: content,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     columnResizeMode: "onChange",
//     onRowSelectionChange: setRowSelection,
//     onColumnVisibilityChange: setColumnVisibility,
//     getRowId: (row) => row.id,
//     state: {
//       rowSelection,
//       columnVisibility,
//     },
//   });

//   return <div></div>;
// }
