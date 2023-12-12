import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  onValueUpdate?: (value: string) => void;
  initialValue: Option;
  options: Option[];
  helpMessage?: string;
  required?: boolean;
}

type ErrorType = string | null;

export default function Dropdown({
  label,
  id,
  placeholder,
  disabled,
  onValueUpdate,
  initialValue,
  options,
}: Props) {
  const [selected, setSelected] = useState<Option | null>(initialValue || null);
  const [show, setShow] = useState<boolean | null>(false);
  const [error, setError] = useState<ErrorType>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const collapse = () => {
    setShow(false);
    if (buttonRef.current) buttonRef.current.focus();
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    option: Option,
  ) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (e.currentTarget.nextSibling) {
          (e.currentTarget.nextSibling as HTMLLIElement).focus();
          break;
        } else {
          (e.currentTarget.parentNode?.childNodes[0] as HTMLLIElement).focus();
          break;
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (e.currentTarget.previousSibling) {
          (e.currentTarget.previousSibling as HTMLLIElement).focus();
          break;
        } else {
          if (e.currentTarget.parentNode) {
            const indexOfLastElement =
              e.currentTarget?.parentNode?.childNodes?.length - 1;
            (
              e.currentTarget.parentNode?.childNodes[
                indexOfLastElement
              ] as HTMLLIElement
            ).focus();
            break;
          }
        }
        break;
      case "Tab":
        e.preventDefault();
        break;
      case " ":
        e.preventDefault();
        setSelected(option);
        collapse();
        break;
      case "Escape":
        e.preventDefault();
        collapse();
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();

        // if dropdown is open and no option is selected then focus on
        // the first list item
        // Once focused on the first list item we will need to handle navigation
        // from <li>. This will be covered in the next section.
        if (show && selected === null && listRef.current) {
          (listRef.current.childNodes[0] as HTMLLIElement).focus();
          break;
        }

        // regardless of dropdown is opened/closed, if no option is selected
        // then select the first option
        if (selected === null) {
          setSelected(options[0]);
          break;
        }

        // if an option is selected and we're on the last option then
        // select the first option
        if (selected && options.indexOf(selected) === options.length - 1) {
          setSelected(options[0]);
          break;
        }
        // if option is already selected then select the next option down
        if (selected) {
          setSelected(options[options.indexOf(selected) + 1]);
          break;
        }

        break;

      case "ArrowUp":
        // same logic as above but in reverse
        e.preventDefault();
        if (show && selected === null && listRef.current) {
          const lastIndex = listRef.current.childNodes.length - 1;
          (listRef.current.childNodes[lastIndex] as HTMLLIElement).focus();
          break;
        }

        if (selected === null) {
          setSelected(options[options.length - 1]);
          break;
        }

        if (selected && options.indexOf(selected) === 0) {
          setSelected(options[options.length - 1]);
          break;
        }

        if (selected) {
          setSelected(options[options.indexOf(selected) - 1]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setSelected(options[0]);
        collapse();
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    setShow(!show);
  };

  const handleItemClick = (option: Option) => {
    setSelected(option);
    setShow(!show);
  };

  const getStyle = () => {
    if (selected) {
      return "text-slate-600 border border-blue-400 bg-blue-50 hover:border-blue-300 cursor-pointer";
    }
    if (disabled) {
      return "border-slate-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed";
    }
    if (error) {
      return "border border-red-500 bg-red-50 text-red-700 hover:border-blue-200 cursor-pointer";
    }
    return "text-slate-600 border-slate-400 hover:border-purple-300 cursor-pointer";
  };

  useEffect(() => {
    if (onValueUpdate !== undefined && selected) {
      onValueUpdate(selected.value);
    }
  }, [selected, onValueUpdate]);

  useEffect(() => {
    if (show && listRef.current && selected) {
      listRef.current.childNodes[options.indexOf(selected)] as HTMLLIElement;
    }
  }, [show, options, selected]);

  useEffect(() => {
    if (!show && selected === null) {
      setError("Please select an option");
    } else {
      setError("");
    }
  }, [show, selected]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        dropdownRef.current &&
        show &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div ref={dropdownRef} className="relative mt-5">
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={show ? show : false}
          aria-label={
            selected ? selected.label : placeholder || "Please select"
          }
          aria-controls={`$${id}-listbox`}
          aria-invalid={error ? true : false}
          ref={buttonRef}
          disabled={disabled}
          id={id}
          onClick={() => handleClick()}
          onKeyDown={(e) => handleKeyDown(e)}
          className={`w-96 pl-6 text-base transition-all rounded-sm border focus:outline focus:outline-blue-800 ${getStyle()}`}
        >
          <div className="flex flex-row justify-between items-center h-16">
            <p id={`${id}-option`}>
              {selected ? selected.label : placeholder || "Please select"}
            </p>
          </div>
        </button>
        {show ? (
          <ul
            className="max-h-80 w-96 overflow-y-auto bg-white z-50 absolute  border-b border-l border-r"
            ref={listRef}
            role="listbox"
            id={`${id}-listbox`}
          >
            {options.map((option) => (
              <li
                key={option.label}
                role="option"
                aria-label={option.label}
                aria-selected={selected === option}
                className={` text-sm text-slate-600 p-5 border border-transparent cursor-pointer hover:bg-blue-50 focus:outline-2 focus:outline-blue-800 ${
                  selected === option ? "bg-blue-200 text-slate-900" : ""
                }`}
                onClick={() => handleItemClick(option)}
                onKeyDown={(e) => handleOptionKeyDown(e, option)}
                tabIndex={show ? 0 : -1}
              >
                {option.label}
              </li>
            ))}
          </ul>
        ) : null}
        {error ? (
          <p className="pt-2 text-red-700" aria-live="assertive">
            {error}
          </p>
        ) : null}
      </div>
    </>
  );
}
