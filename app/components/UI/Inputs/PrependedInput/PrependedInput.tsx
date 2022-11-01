import React, { useCallback } from "react";
import { useBeforeUnload } from "@remix-run/react";

interface IPrependedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  labelName: string;
  name: string;
  type: string;
  value: string | number;
  prependedCharacter: string;
  emoji?: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PrependedInput({
  labelName,
  name,
  type,
  value,
  prependedCharacter,
  emoji,
  changeHandler,
}: IPrependedInputProps) {
  useBeforeUnload(
    useCallback(() => {
      if (typeof value === "number") {
        localStorage.setItem(name, String(value));
      }
      if (typeof value === "string") {
        localStorage.setItem(name, value);
      }
    }, [name, value])
  );

  const handleBlur = (key: string, value: string | number) => {
    if (typeof window !== "undefined") {
      if (typeof value === "string") {
        return window.localStorage.setItem(key, value);
      } else if (typeof value === "number") {
        return window.localStorage.setItem(key, String(value));
      }
    }
  };

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="my-2 flex w-full flex-col gap-1">
        {labelName}&nbsp; {emoji}{" "}
      </label>
      <div className="flex">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900">
          {prependedCharacter}
        </span>
        <input
          name={name}
          aria-label={`${labelName}`}
          id={name}
          type={type}
          value={value}
          onChange={changeHandler}
          onBlur={() => handleBlur(name, value)}
          className={
            "block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
        />
      </div>
      {/* {error && <span className="text-red-600">{error}</span>} */}
    </div>
  );
}
