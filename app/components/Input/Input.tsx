import { InputHTMLAttributes } from "react";

import ValidationMessage from "../ValidationMessage/ValidationMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string | number;
  defaultValue?: string | number;
  name: string;
  placeholder: string;
  error: string | undefined;
  disabled?: boolean;
  navigationState: "idle" | "submitting" | "loading";
}

export default function Input({
  type,
  label,
  value,
  defaultValue,
  name,
  placeholder,
  error,
  disabled,
  navigationState,
}: InputProps) {
  return (
    <div className="mt-5 w-full lg:w-1/2 xl:w-1/3">
      <label
        className="font-semibold text-lg text-gray-600 block mb-2"
        htmlFor={`${name}-field`}
      >
        {label}
      </label>
      <input
        aria-invalid={error !== ""}
        className={
          "outline-none text-base font-normal w-96 text-[rgb(52,64,84)] bg-white border border-gray-400 shadow-inputShadow rounded-lg py-3 px-4 placeholder:text-base placeholder:text-gray-500"
        }
        style={{ borderColor: error ? "red" : "" }}
        defaultValue={defaultValue ?? ""}
        type={type}
        id={`${name}-field`}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error ?? (
        <div>
          <ValidationMessage
            isSubmitting={navigationState === "submitting"}
            error={error ? error : ""}
          />
        </div>
      )}
    </div>
  );
}
