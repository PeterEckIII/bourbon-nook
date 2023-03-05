import * as React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  callToAction: string;
  primary?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  name?: string;
  value?: string;
}

export default function Button({
  callToAction,
  type,
  primary,
  disabled = false,
  name,
  value,
}: ButtonProps) {
  return (
    <div className="my-2">
      <button
        type={type}
        id={`${callToAction.replace(" ", "").toLowerCase()}-button`}
        className={`mr-2
          ${
            primary
              ? "rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              : "focus:shadow-outline h-10 rounded-lg border border-gray-600 bg-white px-5 text-blue-700 transition-colors duration-150 hover:bg-gray-400 hover:text-blue-900"
          }`}
        disabled={disabled}
        name={name}
        value={value}
      >
        {callToAction}
      </button>
    </div>
  );
}
