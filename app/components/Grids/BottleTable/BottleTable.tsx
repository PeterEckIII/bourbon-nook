import type { GridBottle } from "~/models/bottle.server";
import type { Column } from "~/routes/services/search/bottle/fetch";
import Caption from "../Common/Caption";
import TableBody from "../Common/TableBody/TableBody";
import Thead from "../Common/Thead";
import type { SortDirection, SortFields } from "../TestGrid/TestGrid";
import { useCallback, useEffect, useRef } from "react";

type BottleTableProps = {
  columns: Column[];
  items: GridBottle[] | [];
  totalItems: number;
  sortField: SortFields;
  sortDirection: SortDirection;
  tableHeight: string | number;
  activeIndex: number | null;
  handleSortingChange: (field: SortFields) => void;
  mouseDown: (index: number) => void;
};

export default function BottleTable({
  columns,
  items,
  totalItems,
  sortField,
  sortDirection,
  tableHeight,
  activeIndex,
  mouseDown,
  handleSortingChange,
}: BottleTableProps) {
  return (
    <div>
      <div className="overflow-x-scroll">
        <table
          className="w-full border-collapse"
          role="grid"
          aria-describedby="caption"
          tabIndex={0}
          id="grid"
          aria-colcount={columns.length}
          aria-rowcount={totalItems || -1}
        >
          <Caption
            caption="Bottles in your collection"
            info="Each row represents a bottle in your collection. The first column
              is the bottle name. Subsequent columns show the details for each
              bottle"
          />
          <Thead
            columns={columns}
            sortField={sortField}
            sortDirection={sortDirection}
            tableHeight={tableHeight}
            activeIndex={activeIndex}
            handleSortingChange={handleSortingChange}
            mouseDown={mouseDown}
          />
          <TableBody items={items} />
        </table>
      </div>
    </div>
  );
}
