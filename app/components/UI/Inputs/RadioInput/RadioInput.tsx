interface RadioInputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: boolean;
  onChange: () => void;
  onBlur: () => void;
}

export default function RadioInput({
  label,
  id,
  value,
  onChange,
  onBlur,
}: RadioInputProps) {
  return (
    <>
      <input
        type="radio"
        checked={value}
        id={id}
        onChange={onChange}
        className="peer sr-only"
        onBlur={onBlur}
      />
      <label
        htmlFor={id}
        className="h-8 cursor-pointer rounded bg-white bg-opacity-0 py-1 px-2 text-sm leading-6 text-gray-600 shadow-none hover:text-gray-800 peer-checked:bg-opacity-100 peer-checked:shadow"
      >
        {label}
      </label>
    </>
  );
}
