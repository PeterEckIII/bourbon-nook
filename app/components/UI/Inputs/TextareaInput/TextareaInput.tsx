import type { InputHTMLAttributes } from "react";
import ValidationMessage from "../../ValidationMessage";

interface TextareaInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  labelName: string;
  emoji?: string;
  error?: string;
  defaultValue?: string;
}

export default function TextareaInput({
  name,
  labelName,
  emoji,
  error,
  defaultValue,
}: TextareaInputProps) {
  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor={`${name}-field`}
        className="my-2 flex w-full flex-col gap-1"
      >
        {labelName}&nbsp;
        {emoji}{" "}
      </label>
      <div className="flex">
        <textarea
          name={name}
          id={`${name}-field`}
          rows={6}
          defaultValue={defaultValue}
          aria-label={`${labelName}`}
          aria-invalid={Boolean(error) || undefined}
          className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      {error && <ValidationMessage error={error} isSubmitting={false} />}
    </div>
  );
}
