import * as React from "react";
import { Combobox } from "@headlessui/react";
import ChevronDown from "~/components/Icons/ChevronDown";
import type { BottleStatus } from "@prisma/client";

export type Bottle = {
  id: string;
  name: string;
  status: BottleStatus;
  type: string;
  distiller: string | null;
  producer: string | null;
  country: string | null;
  region: string | null;
  price: string | null;
  age: string | null;
  year: string | null;
  batch: string | null;
  alcoholPercent: string | null;
  proof: string | null;
  size: string | null;
  color: string | null;
  finishing: string | null;
  imageUrl: string | null;
};

interface ComboBoxProps {
  value: Bottle | {};
  setValue: React.Dispatch<React.SetStateAction<{} | Bottle>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  bottles: Bottle[];
  queryTerm: string;
}

export default function ComboBox({
  value,
  setValue,
  query,
  setQuery,
  bottles,
  queryTerm,
}: ComboBoxProps) {
  return (
    <div className="mb-2 w-full rounded-lg px-3 md:mb-0">
      <Combobox value={value} onChange={setValue} name="name" nullable>
        <Combobox.Label className="my-2 flex w-full flex-col gap-1">
          Bottle Name
        </Combobox.Label>
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(bottle: Bottle) => (bottle ? bottle.name : "")}
            className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown />
          </Combobox.Button>
        </div>
        <div>
          <Combobox.Options className="rounded-lg bg-gray-100 shadow-2xl">
            {bottles.map((bottle) => (
              <Combobox.Option
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-600 text-white" : "text-gray-900"
                  }`
                }
                key={bottle.id}
                value={bottle}
              >
                <div className="flex flex-col">
                  <div className="font-semibold">{bottle.name}</div>
                  <div>{bottle.distiller}</div>
                </div>
              </Combobox.Option>
            ))}
            {query.length > 0 && (
              <Combobox.Option
                value={{ id: null, name: query }}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-600 text-white" : "text-gray-900"
                  }`
                }
              >
                Add "<span className="font-bold">{queryTerm}</span>" to your
                collection
              </Combobox.Option>
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
