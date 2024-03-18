// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import {
//   // flexRender,
//   TableState,
//   Header,
//   HeaderGroup,
//   RowModel,
// } from "@tanstack/react-table";
// import { Dispatch, RefObject, SetStateAction, useMemo } from "react";

// interface TableProps<D> {
//   getState: () => TableState;
//   getFlatHeaders: () => Header<D, unknown>[];
//   getTotalSize: () => number;
//   getHeaderGroups: () => HeaderGroup<D>[];
//   getRowModel: () => RowModel<D>;
//   isEmpty: boolean;
//   page: number;
//   setPage: Dispatch<SetStateAction<number>>;
//   totalItems: number;
//   totalPages: number;
//   tableRef: RefObject<HTMLTableElement>;
//   tableHeight: string | number;
// }

// export default function Table<D extends Record<string, any>>({} // isEmpty,
// // page,
// // totalItems,
// // totalPages,
// // tableRef,
// // tableHeight,
// // getState,
// // getFlatHeaders,
// // getTotalSize,
// // getHeaderGroups,
// // getRowModel,
// // setPage,
// : TableProps<D>) {
//   // const columnSizingInfo = getState().columnSizingInfo;

//   // const columnSizeVars = useMemo(() => {
//   //   if (columnSizingInfo) {
//   //     const headers = getFlatHeaders();
//   //     const colSizes: Record<string, number> = {};
//   //     for (const header of headers) {
//   //       colSizes[`--header-${header.id}-size`] = header.getSize();
//   //       colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
//   //     }
//   //     return colSizes;
//   //   }
//   // }, [getFlatHeaders, columnSizingInfo]);

//   return <div></div>;
// }
