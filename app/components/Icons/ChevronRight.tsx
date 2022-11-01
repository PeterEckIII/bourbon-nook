import { classNames } from "~/utils/cssHelper";

interface IChevronProps {
  className?: string;
}

export default function ChevronRight({ className }: IChevronProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("h-6 w-6", className ?? "")}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
