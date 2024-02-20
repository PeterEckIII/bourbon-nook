import { BottleStatus } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface DropdownOption {
  value: string;
  label: string;
  namespace?: string;
}

interface CloseHandlerProps {
  setIsOpen: (v: boolean) => void;
}

interface OpenHandlerProps {
  options: DropdownOption[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  select: (v: BottleStatus) => void;
}

function isSafari() {
  const chromeInAgent = navigator.userAgent.indexOf("Chrome") > -1;
  const safariInAgent = navigator.userAgent.indexOf("Safari") > -1;
  return safariInAgent && !chromeInAgent;
}

function registerCloseHandlers({ setIsOpen }: CloseHandlerProps) {
  function keyDownCallback(e: KeyboardEvent) {
    e.preventDefault();
    switch (e.key) {
      case "Up":
      case "ArrowUp":
      case "Down":
      case "ArrowDown":
      case "Enter":
      case " ":
        e.preventDefault();
        setIsOpen(true);
    }
  }

  window.addEventListener("keydown", keyDownCallback);
  return () => {
    window.removeEventListener("keydown", keyDownCallback);
  };
}

function registerOpenHandlers({
  options,
  activeIndex,
  setActiveIndex,
  select,
}: OpenHandlerProps) {
  const keyDownCallback = (e: KeyboardEvent) => {
    e.preventDefault();
    console.log(e);
    switch (e.key) {
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(activeIndex <= 0 ? options.length - 1 : activeIndex - 1);
        return;
      case "Down":
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(
          activeIndex + 1 === options.length ? 0 : activeIndex + 1,
        );
        return;
      case "Enter":
      case " ":
        e.preventDefault();
        select(options[activeIndex].value as BottleStatus);
        return;
      case "Esc":
      case "Escape":
        e.preventDefault();
        setActiveIndex(0);
        return;
      case "PageUp":
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        return;
      case "PageDown":
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        return;
      default:
        break;
    }
  };
  document.addEventListener("keydown", keyDownCallback);

  return () => {
    document.removeEventListener("keydown", keyDownCallback);
  };
}

export default function useAccessibleDropdown(
  options: DropdownOption[],
  value: string,
  onChange: Dispatch<SetStateAction<BottleStatus>>,
) {
  const [isOpen, setIsOpenInternal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  const setIsOpen = useCallback(
    (v: boolean) => {
      if (v) {
        const selected = options.findIndex((o) => o.value === value);
        setActiveIndex(selected < 0 ? 0 : selected);
        if (listRef?.current && isSafari()) {
          requestAnimationFrame(() => {
            listRef?.current?.focus();
          });
        } else {
          if (listRef?.current && isSafari()) {
            (listRef?.current?.previousElementSibling as HTMLElement).focus();
          }
        }
      }
      setIsOpenInternal(v);
    },
    [options, value],
  );

  const select = useCallback(
    (value: BottleStatus) => {
      if (value) {
        onChange && onChange(value);
      }
      setIsOpen(false);
    },
    [setIsOpen, onChange],
  );

  useEffect(() => {
    if (isOpen) {
      registerOpenHandlers({
        options,
        activeIndex,
        setActiveIndex,
        select,
      });
    } else {
      isFocus && registerCloseHandlers({ setIsOpen });
    }
  }, [isOpen, setIsOpen, activeIndex, isFocus, options, select]);

  return {
    isOpen,
    activeIndex,
    listRef,
    setIsOpen,
    setActiveIndex,
    setIsFocus,
    select,
  };
}
