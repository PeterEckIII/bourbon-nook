import ChevronDown from "~/components/Icons/ChevronDown";
import ChevronUp from "~/components/Icons/ChevronUp";
import type { Column, SortFields } from "~/utils/types";

type NameHeaderProps = {
  column: Column;
  handleSortingChange: (field: SortFields) => void;
};

export default function NameHeader({
  column,
  handleSortingChange,
}: NameHeaderProps) {
  return (
    <th
      scope="col"
      role="columnheader"
      aria-colindex={0}
      // aria-sort={
      //   column.sort === "asc"
      //     ? "ascending"
      //     : column.sortDirection === "desc"
      //     ? "descending"
      //     : "none"
      // }
      key={column.field}
      onClick={() => handleSortingChange(column.field as SortFields)}
      className="border-1 sticky left-0 z-10 min-w-[300px] border-gray-100 bg-blue-500 px-4 py-6 text-left text-sm uppercase text-white"
    >
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center">
          <div>{column.header}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ChevronUp
            className={
              // column.sortDirection === "asc"
              //   ? "h-3 w-3 text-white"
              //   :
              "h-3 w-3 text-gray-200"
            }
          />
          <ChevronDown
            className={
              // column.sortDirection === "desc"
              //   ? "h-3 w-3 text-white"
              //   :
              "h-3 w-3 text-gray-200"
            }
          />
        </div>
      </div>
    </th>
  );
}
