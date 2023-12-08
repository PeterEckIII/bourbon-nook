import { BottleStatus } from "@prisma/client";
import { useRef, useState } from "react";

interface StatusProps {
  bottleStatus: BottleStatus;
  value: string;
  options: Option[];
}

export interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  options: Option[];
}

const Select = ({ options, value }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const selected = options.find((o: Option) => o.value === value);
  const listRef = useRef<HTMLUListElement | null>(null);

  function setIsDropdownOpenWithFocus(v: string) {
    if (listRef.current && isSafari()) {
      requestAnimationFrame(() => {
        if (v) {
          listRef?.current?.focus();
        } else {
          (listRef?.current?.previousSibling as HTMLElement).focus();
        }
      });
    }
    setIsDropdownOpen(v);
  }

  return (
    <div className="container">
      <button
        role="combobox"
        aria-haspopup="listbox"
        aria-controls={`${value}_dropdown`}
        aria-labelledby={`${value}_label`}
        aria-expanded={open}
        aria-activedescendant={`${value}_element`}
      >
        Selected: {selected?.label}
      </button>
      <ul
        ref={listRef}
        role="listbox"
        id={`${value}_dropdown`}
        tabIndex={-1}
        aria-multiselectable={false}
      >
        {options.map((o, index) => (
          <li
            key={o.value}
            id={`${value}_element`}
            aria-selected={o.value === value}
            role="option"
            onMouseOver={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          >
            <label htmlFor={o.label}>
              {o.label}
              <input
                type="radio"
                checked={value === o.value}
                value={value}
                name={`${value}_radio`}
                checked={chosen.value === value}
                onChange={select(value)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Status({ bottleStatus }: StatusProps) {
  return (
    <div>
      <label htmlFor="status">Bottle Status</label>
      <select
        name="status"
        id="status"
        className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        defaultValue={bottleStatus}
      >
        <option value="CLOSED">Closed</option>
        <option value="OPENED">Opened</option>
        <option value="FINISHED">Finished</option>
      </select>
    </div>
  );
}
