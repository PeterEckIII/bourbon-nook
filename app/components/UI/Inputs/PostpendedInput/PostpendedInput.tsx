import React, { useCallback } from "react";
import { useBeforeUnload } from "@remix-run/react";

interface IPostpendedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  labelName: string;
  name: string;
  type: string;
  value: string | number;
  postpendedCharacter: string;
  emoji?: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PostpendedInput({
  labelName,
  name,
  type,
  value,
  postpendedCharacter,
  emoji,
  changeHandler,
}: IPostpendedInputProps) {
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
        <input
          name={name}
          aria-label={`${labelName}`}
          id={name}
          value={value}
          type={type}
          onChange={changeHandler}
          onBlur={() => handleBlur(name, value)}
          className={
            "block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
        />
        <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900">
          {postpendedCharacter}
        </span>
      </div>
      {/* {error && <span className="text-red-600">{error}</span>} */}
    </div>
  );
}
