import * as React from "react";
import { useBeforeUnload } from "@remix-run/react";

interface INoteInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: number;
  labelName: string;
  emoji?: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NoteInput({
  name,
  value,
  labelName,
  emoji,
  changeHandler,
}: INoteInputProps) {
  useBeforeUnload(
    React.useCallback(() => {
      localStorage.setItem(name, String(value));
    }, [name, value])
  );

  const handleBlur = (key: string, value: string | number) => {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(key, String(value));
    }
  };

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="my-2 flex w-full flex-col gap-1">
        {labelName}&nbsp; {emoji ? emoji : ""}{" "}
      </label>
      <div className="flex">
        <input
          name={name}
          aria-label={`${labelName}`}
          id={name}
          type={"number"}
          value={value}
          onChange={changeHandler}
          onBlur={() => handleBlur(name, value)}
          className={
            "block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
        />
      </div>
      {/* {error && <span className="text-red-600">{error}</span>} */}
    </div>
  );
}
