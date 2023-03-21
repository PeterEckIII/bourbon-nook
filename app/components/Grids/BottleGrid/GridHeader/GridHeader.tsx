import { Transition, Listbox } from "@headlessui/react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import FilterArrows from "~/components/Icons/FilterArrows";
import Check from "~/components/Icons/Check";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import type { BottleSearchData } from "~/routes/services/search/bottle";
import type { Limit } from "../../TestGrid/TestGrid";
import ChevronDown from "~/components/Icons/ChevronDown";

type GridHeaderProps = {
  searchFetcher: TypedFetcherWithComponents<BottleSearchData>;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  searchParams: URLSearchParams;
  limit: Limit;
  setLimit: Dispatch<SetStateAction<Limit>>;
};

export default function GridHeader({
  searchFetcher,
  handleSearch,
  searchParams,
  limit,
  setLimit,
}: GridHeaderProps) {
  return (
    <div className="mb-6 mr-4 ml-0 flex justify-between p-4">
      <div className="flex w-1/2 items-center">
        <label htmlFor="search" className="w-full py-2">
          <span className="mr-2 text-lg">Search:</span>
          <div className="mr-3 inline w-full border-b-2 border-blue-500 py-2">
            <input
              type="text"
              className="mr-3 w-[75%] appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
              placeholder="Name, Distillery, Producer, Type..."
              id="search"
              aria-label="Search"
              onChange={handleSearch}
              defaultValue={searchParams.get("query") ?? ""}
            />
          </div>
        </label>
      </div>
      <div className="my-8 flex items-center justify-center">
        <div className="mx-2">Results per page</div>
        <div className="mx-2">
          <Listbox value={limit} onChange={setLimit}>
            <Listbox.Button className="relative cursor-default rounded-lg bg-gray-300 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
              <span className="block truncate">{limit}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {[10, 25, 50, 75, 100].map((val, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                    value={val}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : " font-normal"
                          }`}
                        >
                          {val}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <Check ariaHidden={true} classes="h-5 w-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>
    </div>
  );
}
