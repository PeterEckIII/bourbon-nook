import { HTMLProps, useEffect, useRef } from "react";

interface RowCheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate: boolean;
  className?: string;
}

export default function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: RowCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + "cursor-pointer"}
      {...rest}
    />
  );
}
