import SortIcon from "~/components/Tables/Common/SortIcon/SortIcon";
import type { Column, SortFields, Sort } from "~/utils/types";

type HeaderCellProps = {
  column: Column;
  index: number;
  sort: Sort;
  handleSortingChange: (field: SortFields) => void;
  classes?: string;
};

export default function HeaderCell({
  column,
  index,
  sort,
  handleSortingChange,
  classes,
}: HeaderCellProps) {
  return (
    <th
      scope="col"
      role="columnheader"
      aria-colindex={index + 1}
      // aria-sort={}
      onClick={() => handleSortingChange(column.field as SortFields)}
      className={`border-1 border-gray-100 bg-blue-500 px-4 py-6 text-left text-sm uppercase text-white ${classes} first-of-type:sticky first-of-type:left-0 first-of-type:z-10 first-of-type:min-w-[300px]`}
    >
      <div className="flex justify-between">
        <div>{column.header}</div>
        <div>
          {column.sort ? <SortIcon column={column} sort={sort} /> : null}
        </div>
      </div>
    </th>
  );
}
