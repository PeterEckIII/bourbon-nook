import { Column } from "@tanstack/react-table";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Limit } from "~/types/table";

import ActionDropdown from "./ActionDropdown";
import ColumnSelector from "./ColumnSelector";
import PageLimit from "./PageLimit";
import SearchBar from "./SearchBar";

interface NewActionBarProps<D> {
  query: string;
  handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  getAllColumns: () => Column<D>[];
  limit: Limit;
  setLimit: Dispatch<SetStateAction<Limit>>;
}

export type ViewState = "search" | "menu" | "columns" | "none";

export default function NewActionBar<D>({
  query,
  handleQueryChange,
  getAllColumns,
  limit,
  setLimit,
}: NewActionBarProps<D>) {
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
            <PageLimit limit={limit} setLimit={setLimit} />
          </div>
        </div>
      </div>
    </div>
  );
}
