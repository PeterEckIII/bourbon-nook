import { useBeforeUnload } from "@remix-run/react";
import React from "react";
import ValidationMessage from "../../ValidationMessage";

interface ITextareaInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  labelName: string;
  name: string;
  value: string;
  emoji: string;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
}

export default function TextareaInput({
  labelName,
  name,
  value,
  emoji,
  changeHandler,
  error,
  isSubmitting,
}: ITextareaInputProps) {
  useBeforeUnload(
    React.useCallback(() => {
      if (typeof window !== "undefined") {
        return window.localStorage.setItem(name, value);
      }
    }, [name, value])
  );

  const handleBlur = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(key, value);
    }
  };

  return (
    <div className="mx-3 flex w-full flex-col">
      <label htmlFor={name} className="my-2 flex w-full flex-col gap-1">
        {labelName}&nbsp;
        {emoji}{" "}
      </label>
      <div className="flex">
        <textarea
          name={name}
          aria-label={`${labelName}`}
          id={name}
          rows={6}
          value={value}
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
