import { BottleStatus } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

import useAccessibleDropdown, {
  type DropdownOption,
} from "~/utils/useAccessibleDropdown";

interface Props {
  value: string;
  options: DropdownOption[];
  label: string;
  namespace?: string;
  onChange: Dispatch<SetStateAction<BottleStatus>>;
}

export default function Select({
  options,
  value,
  label,
  namespace = "default_select_namespace",
  onChange,
}: Props) {
  const {
    isOpen,
    activeIndex,
    listRef,
    setIsOpen,
    setActiveIndex,
    setIsFocus,
    select,
  } = useAccessibleDropdown(options, value, onChange);

  const chosen = options.find((o) => o.value === value);

  return (
    <div>
      <button
        type="button"
        className="bg-blue-500 text-white px-6 py-3"
        onClick={() => setIsOpen(!isOpen)}
        role="combobox"
        aria-haspopup="listbox"
        aria-controls={`${namespace}_dropdown`}
        aria-labelledby={`${namespace}_label`}
        aria-expanded={isOpen}
        aria-activedescendant={`${namespace}_element_${value}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        aria-label="Choose what status your bottle is in -- Opened, Closed, or Finished"
      >
        Selected {chosen?.label}
      </button>
      <ul
        className="list-style-none"
        role="listbox"
        ref={listRef}
        id={`${namespace}_dropdown`}
        tabIndex={-1}
        aria-multiselectable={false}
      >
        {options.map((option, i) => (
          <li
            key={option.value}
            aria-selected={i === activeIndex}
            id={`${namespace}_element_${option.value}`}
            role="option"
            onMouseOver={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
            className=""
          >
            <label htmlFor={`${namespace}_radio`}>
              <input
                id={`${namespace}_radio`}
                type="radio"
                name={`${namespace}_radio`}
                value={option.value}
                checked={chosen?.value === option.value}
                onChange={() => select(option.value as BottleStatus)}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
