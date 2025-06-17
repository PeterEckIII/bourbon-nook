import type { InputHTMLAttributes } from 'react';

interface TextInput extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  label: string;
  value: string | undefined;
  placeholder: string;
}

export default function TextInput({
  type,
  name,
  label,
  value,
  placeholder,
}: TextInput) {
  return (
    <div>
      <label htmlFor={name} className="block text-lg mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        className="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  );
}
