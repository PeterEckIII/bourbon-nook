import Sort from "~/components/Icons/Sort";
import SortDown from "~/components/Icons/SortDown";
import SortUp from "~/components/Icons/SortUp";
import type { Column, SortDirection, SortFields } from "~/utils/types";

type SortIconProps = {
  sort: boolean;
  column: Column;
};

export default function SortIcon({ sort, column }: SortIconProps) {
  return (
    <div>
      <span className="ml-4">
        <Sort className="h-6 w-6 text-white" />
      </span>
    </div>
  );
}

/*
{ {column.field === sort.field ? (
          sort.direction === "asc" ? (
            <SortUp className="h-6 w-6 text-white" />
          ) : (
            <SortDown className="h-6 w-6 text-white" />
          )
        ) : (
          <Sort className="h-6 w-6 text-white" />
        )} }
*/
