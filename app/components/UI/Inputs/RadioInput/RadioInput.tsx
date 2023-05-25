import type { HTMLAttributes } from "react";

interface RadioInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  value: boolean;
  onChange: () => void;
  field: string;
}

export default function RadioInput({
  label,
  value,
  onChange,
  field,
}: RadioInputProps) {
  return (
    <>
      <input
        type="radio"
        checked={value}
        id={`${field}-field`}
        className="peer sr-only"
        onChange={onChange}
      />
      <label
        htmlFor={`${field}-field`}
        className="h-8 cursor-pointer rounded bg-white bg-opacity-0 px-2 py-1 text-sm leading-6 text-gray-600 shadow-none hover:text-gray-800 peer-checked:bg-opacity-100 peer-checked:shadow"
      >
        {label}
      </label>
    </>
  );
}
