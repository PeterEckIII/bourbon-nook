import { classNames } from "~/utils/cssHelper";

interface ThreeVerticalDotsProps {
  classes: string;
}

export default function ThreeVerticalDots({ classes }: ThreeVerticalDotsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      className={classNames(`current-fill h-4 w-4 ${classes}`)}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
  );
}
