import { ChangeEvent } from "react";

import SearchBar from "./SearchBar";

interface ActionBarProps {
  query: string;
  handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ActionBar({
  query,
  handleQueryChange,
}: ActionBarProps) {
  return (
    <div className="flex justify-between mt-2 mb-1 items-center">
      <div className="flex items-end font-light text-md">
        <div className="rounded-full bg-gray-300 mx-2">
          <button className="px-4 py-1">Mark as</button>
        </div>
        <div className="rounded-full bg-gray-300 mx-2">
          <button className="px-4 py-1">Edit</button>
        </div>
        <div className="rounded-full bg-gray-300 mx-2">
          <button className="px-4 py-1">Delete</button>
        </div>
      </div>
      <div className="w-3/12">
        <SearchBar query={query} handleQueryChange={handleQueryChange} />
      </div>
    </div>
  );
}
