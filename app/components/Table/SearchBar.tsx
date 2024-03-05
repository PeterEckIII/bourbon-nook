import { ChangeEvent } from "react";

interface SearchBarProps {
  query: string;
  handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  query,
  handleQueryChange,
}: SearchBarProps) {
  return (
    <div className="my-3 place-self-end w-full h-10 pr-4">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="p-2 text-small bg-gray-200 rounded-lg w-full"
        onChange={handleQueryChange}
        value={query}
      />
    </div>
  );
}
