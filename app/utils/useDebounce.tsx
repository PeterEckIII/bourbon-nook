import { useState, useEffect, useRef } from "react";

export default function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    timerRef.current = timeout;

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
