interface TextareaInputProps {
  name: string;
  id: string;
  label: string;
  placeholder: string;
  rows: number;
}

export default function TextareaInput({
  name,
  id,
  label,
  placeholder,
  rows,
}: TextareaInputProps) {
  return (
    <div>
      <label className="block mb-2 text-lg" htmlFor={label}>
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}
