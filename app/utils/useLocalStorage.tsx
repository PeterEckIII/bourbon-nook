import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect, useCallback } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}": ${error}`);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a client`
        );
      }

      try {
        const newValue = value instanceof Function ? value(readValue()) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}": ${error}`);
      }
    },
    [key, readValue]
  );

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
