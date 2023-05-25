export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  callToAction: string;
  primary?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  name?: string;
  value?: string;
  position?: "left" | "middle" | "right";
}

export default function Button({
  callToAction,
  type,
  primary,
  disabled,
  name,
  value,
  position,
}: ButtonProps) {
  return (
    <div
      className={`justify-${
        position &&
        (position === "left"
          ? "start"
          : position === "right"
          ? "end"
          : position === "middle"
          ? "center"
          : "")
      } my-2 flex`}
    >
      <button
        type={type}
        id={`${callToAction.replace(" ", "").toLowerCase()}-button`}
        className={`${
          disabled
            ? "rounded-md border-2 border-gray-400 bg-gray-200 px-4 py-2 text-gray-500 disabled:cursor-not-allowed"
            : primary
            ? "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            : "focus:shadow-outline h-10 rounded-lg border border-gray-600 bg-white px-5 text-blue-700 transition-colors duration-150 hover:bg-gray-400 hover:text-white"
        }`}
        disabled={disabled}
        aria-disabled={disabled}
        name={name}
        value={value}
      >
        {callToAction}
      </button>
    </div>
  );
}
