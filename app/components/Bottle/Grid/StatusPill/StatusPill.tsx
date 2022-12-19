import { classNames } from "~/utils/cssHelper";

type StatusPillProps = {
  value?: string;
  valueFormatted?: string;
};

export default function StatusPill(props: StatusPillProps) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  return (
    <span
      className={classNames(
        "leading-wide rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm",
        cellValue === "CLOSED" ? "bg-yellow-400 text-yellow-700" : "",
        cellValue === "OPENED" ? "bg-green-400 text-green-700" : "",
        cellValue === "FINISHED" ? "bg-gray-400 text-gray-700" : ""
      )}
    >
      {cellValue}
    </span>
  );
}
