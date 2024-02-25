import { useFetcher } from "@remix-run/react";
import {
  ColumnDef,
  RowSelectionState,
  createColumnHelper,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import MyTable from "~/components/Table/GenericTable";
import IndeterminateCheckbox from "~/components/Table/IndeterminateCheckbox";
import ItemActions from "~/components/Table/ItemActions";
import { TableBottle } from "~/types/bottle";
import { useEventListener } from "~/utils/useEventListener";

import { BottleSearchData } from "./api.search-bottles";

const helper = createColumnHelper<TableBottle>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }),
  helper.accessor("name", {
    header: "Name",
    footer: (props) => props.column.id,
    enableResizing: true,
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
  }),
];

export default function Test() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { load, data, state } = useFetcher<BottleSearchData>();

  const bottles = useMemo(() => {
    return data?.bottles || [];
  }, [data]);

  const isEmpty = state === "idle" && bottles.length === 0;

  useEffect(() => {
    load("/api/search-bottles?query=&limit=10&page=0");
  }, [load]);

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

  return (
    <div>
      <MyTable
        data={bottles}
        columns={columns}
        isEmpty={isEmpty}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
}
