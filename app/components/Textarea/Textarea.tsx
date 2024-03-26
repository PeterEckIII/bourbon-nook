import { InputHTMLAttributes } from "react";

import ValidationMessage from "../ValidationMessage/ValidationMessage";

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value?: string;
  defaultValue?: string;
  name: string;
  error: string | undefined;
  navigationState: "idle" | "submitting" | "loading";
}

export default function Textarea({
  label,
  defaultValue,
  name,
  error,
  navigationState,
}: TextareaProps) {
  return (
    <div className="mt-5 w-full lg:w-1/2 xl:w-1/3">
      <label
        htmlFor={`${name}-field`}
        className="font-semibold text-lg text-gray-600 block mb-2"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={`${name}-field`}
        rows={6}
        defaultValue={defaultValue}
        aria-label={`${label}`}
        aria-invalid={Boolean(error) || undefined}
        className="outline-none text-base font-normal w-96 text-[rgb(52,64,84)] bg-white border border-gray-400 shadow-inputShadow rounded-lg py-3 px-4 placeholder:text-base placeholder:text-gray-500"
      />
      {error ? (
        <div>
          <ValidationMessage
            isSubmitting={navigationState === "submitting"}
            error={error}
          />
        </div>
      ) : null}
    </div>
  );
}
