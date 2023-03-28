import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Limit } from "../../TestGrid/NewTestGrid";
import PageLimit from "../PageLimit/PageLimit";

type GlobalFilterProps = {
  query: string;
  limit: Limit;
  handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setLimit: Dispatch<SetStateAction<Limit>>;
};

export default function Filter({
  query,
  limit,
  handleQueryChange,
  setLimit,
}: GlobalFilterProps) {
  return (
    <div className="justify my-8 mx-2 flex">
      <div className="flex w-2/3 items-center border-b border-blue-500 py-2">
        <span className="mx-2 inline">Search: </span>
        <input
          type="text"
          className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
          placeholder="Name, Type, Distiller, Producer..."
          aria-label="Search"
          onChange={handleQueryChange}
          value={query}
        />
      </div>
      <div className="flex w-1/3 items-center justify-end">
        Results per page: &nbsp;
        <PageLimit limit={limit} setLimit={setLimit} />
      </div>
    </div>
  );
}
