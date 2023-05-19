import type { InputHTMLAttributes } from "react";
import ValidationMessage from "../../ValidationMessage";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName: string;
  type: string;
  emoji?: string;
  error?: string;
  defaultValue?: string;
}

export default function TextInput({
  name,
  labelName,
  type,
  defaultValue,
  emoji,
  error,
}: TextInputProps) {
  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor={`${name}-field`}
        className="my-2 flex w-full flex-col gap-1"
      >
        {labelName}&nbsp;
        {emoji ? emoji : ""}{" "}
      </label>
      <div className="flex">
        <input
          type={type}
          aria-label={labelName}
          name={name}
          id={`${name}-field`}
          defaultValue={defaultValue}
          aria-invalid={Boolean(error) || undefined}
          className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      {error && (
        <div className="ml-1 mt-1 flex w-auto">
          <div
            role="alert"
            className="w-auto rounded bg-red-200 px-2 py-4 text-red-600 shadow-md"
          >
            <ValidationMessage error={error} isSubmitting={false} />
          </div>
        </div>
      )}
    </div>
  );
}
