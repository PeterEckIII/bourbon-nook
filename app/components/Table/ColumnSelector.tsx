import { Popover, Transition } from "@headlessui/react";
import { Column } from "@tanstack/react-table";
import { Fragment } from "react";

import ChevronDown from "../Icons/ChevronDown";
import ViewColumns from "../Icons/ViewColumns";
import Toggle from "../Toggle/Toggle";

interface ColumnSelectorProps<D> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllColumns: () => Column<D, any>[] | null;
}

export default function ColumnSelector<D>({
  getAllColumns,
}: ColumnSelectorProps<D>) {
  return (
    <div className="w-full max-w-sm px-4 my-3">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${
                open ? "text-white" : "text-white/90"
              } group inline-flex items-center rounded-md bg-blue-700 px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <span>
                <ViewColumns />
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`${
                  open ? "text-blue-300" : "text-blue-300/70"
                } ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-blue-300/80`}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {getAllColumns()!.map((column) => {
                      let display = "";
                      if (column.id === "actions" || column.id === "select") {
                        display = column.id;
                      } else {
                        display = column.columnDef.header?.toString() as string;
                      }
                      return (
                        <div key={column.id} className="flex justify-between">
                          <div className="flex flex-col">
                            <div>
                              <Toggle
                                enabled={column.getIsVisible()}
                                setEnabled={() => column.toggleVisibility()}
                                header={display}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
