import { classNames } from "~/utils/cssHelper";

type AddIconProps = {
  classes?: string;
};

export default function AddIcon({ classes }: AddIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={classNames(
        "inline filter hover:translate-y-[1px] hover:translate-x-[1px] hover:text-blue-600 ",
        classes ?? ""
      )}
      height="75"
      width="125"
    >
      <filter id="shadow">
        <feDropShadow dx="2" dy="2" stdDeviation={3} floodOpacity={0.5} />
      </filter>
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
