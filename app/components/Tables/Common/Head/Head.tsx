import type { Column, Sort, SortFields } from "~/utils/types";
import HeaderCell from "../HeaderCell";

type HeadProps = {
  columns: Column[];
  handleSortingChange: (field: SortFields) => void;
  sort: boolean;
};

export default function Head({
  columns,
  sort,
  handleSortingChange,
}: HeadProps) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          return (
            <HeaderCell
              key={column.field}
              column={column}
              index={index}
              sort={sort}
              handleSortingChange={handleSortingChange}
            />
          );
        })}
      </tr>
    </thead>
  );
}
