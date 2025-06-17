import type { InputHTMLAttributes } from 'react';

interface TextInput extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  label: string;
  placeholder: string;
}

export default function TextInput({
  type,
  name,
  label,
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
        className="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  );
}
