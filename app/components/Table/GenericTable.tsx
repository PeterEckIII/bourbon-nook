/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useReactTable,
  type TableOptions,
  getCoreRowModel,
  flexRender,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// import { getTableCellStyle } from "~/utils/table-helpers";

export type TableProps<D extends Record<string, any>> = Pick<
  TableOptions<D>,
  "columns" | "data"
> & {
  rowSelection?: RowSelectionState;
  setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;
  isEmpty: boolean;
};

export default function MyTable<D extends Record<string, any>>({
  columns,
  data,
  rowSelection,
  setRowSelection,
  isEmpty,
}: TableProps<D>) {
  const [tableHeight, setTableHeight] = useState<string | number>("auto");
  const tableRef = useRef<HTMLTableElement | null>(null);

  const {
    getHeaderGroups,
    getFlatHeaders,
    getRowModel,
    getTotalSize,
    getState,
  } = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    state: {
      rowSelection,
    },
  });

  useEffect(() => {
    setTableHeight(tableRef.current?.offsetHeight || "auto");
  }, []);

  const columnSizingInfo = getState().columnSizingInfo;

  const columnSizeVars = useMemo(() => {
    const headers = getFlatHeaders();
    const colSizes: Record<string, number> = {};
    for (const header of headers) {
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [getFlatHeaders, columnSizingInfo]);

  return (
    <div className="flex items-center justify-center">
      {!isEmpty ? (
        <div className="flex justify-center items-center overflow-x-auto">
          <table
            className={`min-w-full h-full flex flex-col`}
            style={{ ...columnSizeVars, width: getTotalSize() }}
            ref={tableRef}
          >
            <thead className="w-full border-b border-b-gray-500 bg-gray-200">
              {getHeaderGroups().map((headerGroup) => (
                <div key={headerGroup.id} className="flex items-center">
                  {headerGroup.headers.map((header) => {
                    // const { size, minSize, maxSize } = header.column.columnDef;
                    return (
                      <th
                        key={header.id}
                        className={
                          "relative flex justify-between py-3 px-4 text-gray-700 font-medium text-left"
                        }
                        style={{
                          width: `calc(var(--header-${header?.id}-size) * 1px)`,
                        }}

                        // style={getTableCellStyle({ size, minSize, maxSize })}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
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
                      // const { size, minSize, maxSize } = cell.column.columnDef;
                      return (
                        <td
                          key={cell.id}
                          className={
                            "flex text-left items-center py-3 px-4 text-gray-700 whitespace-nowrap text-ellipsis overflow-hidden"
                          }
                          style={{
                            width: `calc(var(--col-${cell.column?.id}-size) * 1px)`,
                          }}
                          // style={getTableCellStyle({ size, minSize, maxSize })}
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
