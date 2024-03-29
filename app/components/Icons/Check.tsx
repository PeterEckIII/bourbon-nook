interface CheckProps {
  ariaHidden: boolean;
  classes?: string;
}

export default function Check({ ariaHidden, classes }: CheckProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden={ariaHidden}
      className={classes ? classes : "h-6 w-6"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}
