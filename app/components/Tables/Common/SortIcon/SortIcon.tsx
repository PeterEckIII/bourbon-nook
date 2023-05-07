import type { Column, SortDirection, SortFields } from "~/utils/types";

type SortIconProps = {
  sort: {
    field: SortFields;
    direction: SortDirection;
  };
  column: Column;
};

export default function SortIcon({ sort, column }: SortIconProps) {
  return (
    <span className="ml-4">
      {column.field === sort.field
        ? sort.direction === "asc"
          ? "↑"
          : "↓"
        : "️↕"}
    </span>
  );
}
