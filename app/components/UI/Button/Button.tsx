import * as React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  callToAction: string;
  primary?: boolean;
  type: "button" | "submit" | "reset" | undefined;
}

export default function Button({ callToAction, type, primary }: ButtonProps) {
  return (
    <div className="my-2 text-right">
      <button
        type={type}
        id={`${callToAction.replace(" ", "").toLowerCase()}-button`}
        className={
          primary
            ? "rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            : "focus:shadow-outline h-10 rounded-lg border border-blue-600 px-5 text-blue-700 transition-colors duration-150 hover:bg-blue-500 hover:text-blue-100"
        }
      >
        {callToAction}
      </button>
    </div>
  );
}
