import { Column, Updater } from "@tanstack/react-table";
import { ChangeEvent } from "react";

import ActionDropdown from "./ActionDropdown";
import ColumnSelector from "./ColumnSelector";
import PageLimit from "./PageLimit";
import SearchBar from "./SearchBar";

interface ActionBarProps<D> {
  query: string;
  handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  getAllColumns: () => Column<D>[];
  pageSize: number;
  setPageSize: (updater: Updater<number>) => void;
}

export type ViewState = "search" | "menu" | "columns" | "none";

export default function ActionBar<D>({
  query,
  handleQueryChange,
  getAllColumns,
  pageSize,
  setPageSize,
}: ActionBarProps<D>) {
  return (
    <div className="flex mt-2 mb-1 items-center justify-between">
      <div className="flex justify-between w-5/12">
        <div className="my-1 w-full">
          <SearchBar query={query} handleQueryChange={handleQueryChange} />
        </div>
        <div className="flex w-4/12">
          <div>
            <ActionDropdown />
          </div>
          <div>
            <ColumnSelector getAllColumns={getAllColumns} />
          </div>
          <div>
            <PageLimit limit={pageSize} setLimit={setPageSize} />
          </div>
        </div>
      </div>
    </div>
  );
}
