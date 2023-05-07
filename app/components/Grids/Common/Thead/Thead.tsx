import type { Column } from "~/routes/services/search/bottle/fetch";
import type { SortDirection, SortFields } from "../../TestGrid/TestGrid";
import HeadCell from "../HeadCell";

type TheadProps = {
  columns: Column[];
  sortField: SortFields;
  sortDirection: SortDirection;
  tableHeight: string | number;
  activeIndex: number | null;
  mouseDown: (index: number) => void;
  handleSortingChange: (sortField: SortFields) => void;
};

export default function Thead({
  columns,
  sortField,
  sortDirection,
  tableHeight,
  activeIndex,
  mouseDown,
  handleSortingChange,
}: TheadProps) {
  return (
    <thead className="border-b-2 border-blue-500">
      <tr
        className="overflow-hidden border-b-2 text-gray-700"
        role="row"
        aria-rowindex={1}
      >
        {columns.map((column, index) => (
          <HeadCell
            column={column}
            key={column.field}
            sortField={sortField}
            sortDirection={sortDirection}
            tableHeight={tableHeight}
            index={index}
            activeIndex={activeIndex}
            handleSortingChange={handleSortingChange}
            mouseDown={mouseDown}
          />
        ))}
      </tr>
    </thead>
  );
}
