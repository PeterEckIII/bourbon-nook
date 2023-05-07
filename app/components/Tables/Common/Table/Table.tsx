import type { MutableRefObject, ReactNode } from "react";
import type { Column } from "~/utils/types";

type TableProps = {
  children: ReactNode;
  tabIndex: number | undefined;
  columns: Column[];
  totalItems: number;
  tableRef: MutableRefObject<HTMLTableElement | null>;
};

export default function Table({
  children,
  tabIndex,
  columns,
  totalItems,
  tableRef,
}: TableProps) {
  return (
    <div
      className="m-4 overflow-x-scroll"
      tabIndex={tabIndex}
      role="group"
      ref={tableRef}
    >
      <table
        className="border-1 my-[25px] mx-auto border-collapse border-solid border-gray-200 font-sans shadow-table"
        style={{ borderBottom: "4px solid rgb(59, 130, 246)" }}
        role="grid"
        aria-describedby="caption"
        id="bottle-grid"
        aria-colcount={columns.length}
        aria-rowcount={totalItems || -1}
      >
        {children}
      </table>
    </div>
  );
}
