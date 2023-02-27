import type { InputHTMLAttributes } from "react";
import ValidationMessage from "../../ValidationMessage";

interface NoteInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName: string;
  emoji?: string;
  error?: string;
}

export default function NoteInput({
  name,
  labelName,
  emoji,
  error,
}: NoteInputProps) {
  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor={`${name}-field`}
        className="my-2 flex w-full flex-col gap-1"
      >
        {labelName}&nbsp; {emoji ? emoji : ""}{" "}
      </label>
      <div className="flex">
        <input
          type="text"
          name={name}
          id={`${name}-field`}
          aria-label={labelName}
          className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      {error && <ValidationMessage error={error} isSubmitting={false} />}
    </div>
  );
}
