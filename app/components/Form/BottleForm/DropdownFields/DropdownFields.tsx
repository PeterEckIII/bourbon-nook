import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import ChevronDown from "~/components/Icons/ChevronDown";
import ChevronUp from "~/components/Icons/ChevronUp";
import TextInput from "~/components/UI/Inputs/TextInput";
import type { BottleErrors } from "~/utils/types";
import { Transition } from "@headlessui/react";

type DropdownFieldsProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  errors: BottleErrors | null;
};

export default function DropdownFields({
  errors,
  opened,
  setOpened,
}: DropdownFieldsProps) {
  return (
    <div>
      <div className="ml-10">
        <button onClick={() => setOpened((opened) => !opened)} type="button">
          <div className="flex">
            <div>Additional details</div>
            <div>{opened ? <ChevronUp /> : <ChevronDown />}</div>
          </div>
        </button>
      </div>
      <Transition
        className="flex w-full flex-wrap"
        show={opened}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {opened ? (
          <div className="flex w-full flex-wrap p-2 sm:p-6 lg:w-2/3">
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Year"
                name="year"
                emoji="📅"
                error={errors?.year}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Batch"
                name="batch"
                emoji="🔡"
                error={errors?.batch}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Barrel #"
                name="barrel"
                emoji="2️⃣"
                error={errors?.barrel}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Size"
                name="size"
                emoji="🍆"
                error={errors?.size}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Finishing"
                name="finishing"
                emoji="🍷"
                error={errors?.finishing}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Open Date"
                name="openDate"
                emoji="📆"
                error={errors?.openDate}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Kill Date"
                name="killDate"
                emoji="📅"
                error={errors?.killDate}
              />
            </div>
          </div>
        ) : (
          <div className="h-12 w-24 bg-white"></div>
        )}
      </Transition>
    </div>
  );
}
