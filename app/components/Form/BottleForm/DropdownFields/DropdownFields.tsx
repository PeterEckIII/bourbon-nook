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
        <button
          onClick={() => setOpened((opened) => !opened)}
          type="button"
          aria-pressed={opened}
        >
          <div className="flex">
            <div>Additional details</div>
            <div>{opened ? <ChevronUp /> : <ChevronDown />}</div>
            {opened ? null : (
              <>
                <input type="hidden" name="year" />
                <input type="hidden" name="batch" />
                <input type="hidden" name="barrel" />
                <input type="hidden" name="size" />
                <input type="hidden" name="finishing" />
                <input type="hidden" name="openDate" />
                <input type="hidden" name="killDate" />
              </>
            )}
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
              <TextInput type="text" labelName="Year" name="year" emoji="📅" />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Batch"
                name="batch"
                emoji="🔡"
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Barrel #"
                name="barrel"
                emoji="2️⃣"
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput type="text" labelName="Size" name="size" emoji="🍆" />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Finishing"
                name="finishing"
                emoji="🍷"
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Open Date"
                name="openDate"
                emoji="📆"
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Kill Date"
                name="killDate"
                emoji="📅"
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
