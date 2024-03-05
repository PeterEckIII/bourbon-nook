import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import CheckWithCircle from "../Icons/CheckWithCircle";
import EllipsisCircle from "../Icons/EllipsisCircle";
import Trash from "../Icons/Trash";

export default function ActionDropdown() {
  return (
    <div className="text-right my-2 px-4">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <EllipsisCircle className={"h-8 w-8 p-1 rounded-md"} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 flex flex-col w-auto">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } flex items-center py-5 w-auto`}
                  >
                    <CheckWithCircle
                      className={`${
                        active ? "text-white" : "text-blue-500"
                      } h-10 w-10 px-2`}
                    />
                    <span
                      className={`${
                        active ? "text-white" : "text-blue-500"
                      } h-10 w-10 whitespace-nowrap pt-2 px-2`}
                    >
                      Mark as
                    </span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } flex items-center py-5 w-auto`}
                  >
                    <Trash
                      className={`${
                        active ? "text-white" : "text-blue-500"
                      } h-10 w-10 px-2`}
                    />
                    <span
                      className={`${
                        active ? "text-white" : "text-blue-500"
                      } h-10 w-10 whitespace-nowrap pt-2 px-2`}
                    >
                      Delete
                    </span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
