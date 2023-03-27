import { Listbox, Transition } from "@headlessui/react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import ChevronDown from "~/components/Icons/ChevronDown";
import Check from "~/components/Icons/Check";
import type { Limit } from "../../TestGrid/NewTestGrid";

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
    <div className="justify my-4 mx-2 flex">
      <div className="flex w-3/4 items-center border-b border-blue-500 py-2">
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
      <div className="flex w-1/4 items-center justify-center">
        <div className="">
          <Listbox value={limit} onChange={setLimit}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-300 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400 sm:text-sm">
                <span className="block truncate text-gray-700">{limit}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-5 w-5 text-gray-700" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {[10, 25, 50, 100, 250].map((num, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative flex cursor-default select-none justify-center py-2 pl-6 pr-4 ${
                          active ? `bg-blue-100 text-blue-900` : `text-gray-900`
                        }`
                      }
                      value={num}
                    >
                      {({ selected }) => (
                        <div className="flex">
                          <span
                            className={`inline truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {num}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 inline-flex items-center pl-1 text-blue-600">
                              <Check ariaHidden={true} classes="h-5 w-5" />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
}
