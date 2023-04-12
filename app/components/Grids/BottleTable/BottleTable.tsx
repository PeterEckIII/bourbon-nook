import type { GridBottle } from "~/models/bottle.server";
import type { Column } from "~/routes/services/search/bottle/fetch";
import Caption from "../Common/Caption";
import TableBody from "../Common/TableBody/TableBody";
import Thead from "../Common/Thead";
import type { SortDirection, SortFields } from "../TestGrid/TestGrid";

type BottleTableProps = {
  columns: Column[];
  items: GridBottle[] | [];
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
        <table className="w-full border-collapse">
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
