import { useEffect, useState } from "react";

type ValidationMessageProps = {
  error: any;
  isSubmitting: boolean;
};

export default function ValidationMessage({
  error,
  isSubmitting,
}: ValidationMessageProps) {
  const [show, setShow] = useState<boolean>(!!error);

  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError && !isSubmitting);
    });
    return clearTimeout(id);
  }, [error, isSubmitting]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        height: show ? "1em" : 0,
        color: "red",
        transition: "all 300ms ease-in-out",
      }}
    >
      {error}
    </div>
  );
}
