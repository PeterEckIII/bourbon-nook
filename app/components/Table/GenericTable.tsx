/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  TableState,
  Header,
  HeaderGroup,
  RowModel,
} from "@tanstack/react-table";
import { RefObject, useMemo } from "react";

import FilterDown from "../Icons/FilterDown";
import FilterNeutral from "../Icons/FilterNeutral";
import FilterUp from "../Icons/FilterUp";

interface MyTableProps<D> {
  getState: () => TableState;
  getFlatHeaders: () => Header<D, unknown>[];
  getTotalSize: () => number;
  getHeaderGroups: () => HeaderGroup<D>[];
  getRowModel: () => RowModel<D>;
  isEmpty: boolean;
  page: number;
  totalItems: number;
  totalPages: number;
  tableRef: RefObject<HTMLTableElement>;
  tableHeight: string | number;
}

export default function MyTable<D extends Record<string, any>>({
  getState,
  getFlatHeaders,
  getTotalSize,
  getHeaderGroups,
  getRowModel,
  isEmpty,
  tableHeight,
  tableRef,
}: MyTableProps<D>) {
  const columnSizingInfo = getState().columnSizingInfo;

  const columnSizeVars = useMemo(() => {
    if (columnSizingInfo) {
      const headers = getFlatHeaders();
      const colSizes: Record<string, number> = {};
      for (const header of headers) {
        colSizes[`--header-${header.id}-size`] = header.getSize();
        colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
      }
      return colSizes;
    }
  }, [getFlatHeaders, columnSizingInfo]);

  return (
    <div className="flex items-center">
      {!isEmpty ? (
        <div className="flex flex-col justify-center overflow-x-auto">
          <table
            className={"min-w-full h-full flex flex-col"}
            style={{ ...columnSizeVars, width: getTotalSize() }}
            ref={tableRef}
          >
            <thead className="w-full border-b border-b-gray-500 bg-gray-200">
              {getHeaderGroups().map((headerGroup) => (
                <div key={headerGroup.id} className="flex items-center">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className={
                          "relative flex justify-between py-3 px-4 text-gray-700 font-medium text-left"
                        }
                        style={{
                          width: `calc(var(--header-${header?.id}-size) * 1px)`,
                        }}
                      >
                        <span
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex min-w-[36px]"
                              : ""
                          }
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <FilterUp />,
                            desc: <FilterDown />,
                            default: <FilterNeutral />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </span>
                        <div
                          onDoubleClick={() => header.column.resetSize()}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          style={{ height: tableHeight }}
                          className={`absolute block w-2 top-0 right-0 z-10 ${
                            header.column.getCanResize()
                              ? "border-r-4 border-r-transparent hover:border-r-gray-500 active:border-r-blue-500 cursor-col-resize"
                              : ``
                          }`}
                        ></div>
                      </th>
                    );
                  })}
                </div>
              ))}
            </thead>
            <tbody className="">
              {getRowModel().rows.map((row) => (
                <tr
                  onDoubleClick={() => row.toggleSelected()}
                  key={row.id}
                  className={
                    row.getIsSelected()
                      ? "flex flex-col border-b border-b-gray-500 bg-blue-200 hover:bg-blue-200 last:border-b-transparent"
                      : "flex flex-col border-b border-b-gray-500 last:border-b-transparent hover:bg-blue-200"
                  }
                >
                  <div className="flex">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={
                            "flex text-left items-center py-3 px-4 text-gray-700 whitespace-nowrap text-ellipsis overflow-hidden"
                          }
                          style={{
                            width: `calc(var(--col-${cell.column?.id}-size) * 1px)`,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // EMPTY TABLE
        <div></div>
      )}
    </div>
  );
}
