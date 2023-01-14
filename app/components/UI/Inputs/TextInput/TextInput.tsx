import React, { useCallback } from "react";
import { useBeforeUnload } from "@remix-run/react";
import ValidationMessage from "../../ValidationMessage";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  labelName: string;
  name: string;
  type: string;
  value: string;
  emoji?: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
}

export default function TextInput({
  labelName,
  name,
  type,
  value,
  emoji,
  changeHandler,
  error,
  isSubmitting,
  defaultValue,
}: TextInputProps) {
  useBeforeUnload(
    useCallback(() => {
      localStorage.setItem(name, value);
    }, [name, value])
  );

  const handleBlur = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(key, value);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="my-2 flex w-full flex-col gap-1">
        {labelName}&nbsp;
        {emoji ? emoji : ""}{" "}
      </label>
      <div className="flex">
        <input
          aria-label={labelName}
          name={name}
          id={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={changeHandler}
          onBlur={() => handleBlur(name, value)}
          className={
            "block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
          aria-invalid={Boolean(error) || undefined}
        />
      </div>
      {error && <ValidationMessage error={error} isSubmitting={isSubmitting} />}
    </div>
  );
}
