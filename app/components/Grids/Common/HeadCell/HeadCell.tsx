import FilterArrowDown from "~/components/Icons/FilterArrowDown";
import FilterArrows from "~/components/Icons/FilterArrows";
import FilterArrowUp from "~/components/Icons/FilterArrowUp";
import type { Column } from "~/routes/services/search/bottle/fetch";
import type { SortDirection, SortFields } from "../../TestGrid/TestGrid";

type HeadCellProps = {
  column: Column;
  sortField: SortFields;
  sortDirection: SortDirection;
  tableHeight: string | number;
  key: string | number;
  index: number;
  activeIndex: number | null;
  handleSortingChange: (sortField: SortFields) => void;
  mouseDown: (index: number) => void;
};

export default function HeadCell({
  column,
  key,
  index,
  activeIndex,
  sortField,
  sortDirection,
  tableHeight,
  mouseDown,
  handleSortingChange,
}: HeadCellProps) {
  return (
    <>
      {column.sort ? (
        <th
          ref={column.ref}
          scope="col"
          role="columnheader"
          aria-colindex={index + 1}
          aria-sort={
            sortDirection === "asc"
              ? "ascending"
              : sortDirection === "desc"
              ? "descending"
              : "none"
          }
          key={key}
          onClick={() => handleSortingChange(column.field as SortFields)}
          className={
            column.textPosition
              ? column.textPosition +
                " border-b-2 text-gray-700 first-of-type:sticky first-of-type:left-0 first-of-type:w-[300px] first-of-type:min-w-[300px] first-of-type:bg-white"
              : "border-b-2 text-left text-gray-700 first-of-type:sticky first-of-type:left-0 first-of-type:w-[300px] first-of-type:min-w-[300px] first-of-type:bg-white"
          }
        >
          <div className="flex">
            <div className="mr-2">{column.header}</div>
            <div className="">
              {column.sort &&
              column.field === sortField &&
              sortDirection === "asc" ? (
                <FilterArrowUp />
              ) : column.field === sortField && sortDirection === "desc" ? (
                <FilterArrowDown />
              ) : (
                <FilterArrows />
              )}
            </div>
            <div
              style={{ height: tableHeight }}
              onMouseDown={() => mouseDown(index)}
              className={`z-1 absolute right-0 top-0 block w-2 cursor-col-resize border-r-2 border-transparent hover:border-gray-200 ${
                activeIndex === index ? "border-gray-700" : ""
              }`}
            />
          </div>
        </th>
      ) : (
        <th
          ref={column.ref}
          scope="col"
          role="columnheader"
          aria-colindex={index + 1}
          aria-sort="none"
          key={column.field}
          className={
            column.textPosition
              ? column.textPosition +
                " border-b-2 text-gray-700 first-of-type:sticky first-of-type:left-0 first-of-type:w-[300px] first-of-type:min-w-[300px] first-of-type:bg-white"
              : "border-b-2 text-left text-gray-700 first-of-type:sticky first-of-type:left-0 first-of-type:w-[300px] first-of-type:min-w-[300px] first-of-type:bg-white"
          }
        >
          <span>{column.header}</span>
          <div
            style={{ height: tableHeight }}
            onMouseDown={() => mouseDown(index)}
            className={`z-1 absolute right-0 top-0 block w-2 cursor-col-resize border-r-2 border-transparent hover:border-gray-200 ${
              activeIndex === index ? "border-gray-700" : ""
            }`}
          />
        </th>
      )}
    </>
  );
}
