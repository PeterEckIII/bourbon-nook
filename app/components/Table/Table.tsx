/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAsyncValue, useNavigation } from "@remix-run/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
}

export default function Table<T>({ columns }: TableProps<T>) {
  const value = useAsyncValue();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  const tableData = useMemo(
    () => (isLoading ? Array(10).fill({}) : value),
    [isLoading, value],
  ) as T[];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-4">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
