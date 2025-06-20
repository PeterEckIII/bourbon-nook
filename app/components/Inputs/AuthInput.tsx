import type { RefObject } from 'react';

interface AuthInputProps {
  type: 'email' | 'text' | 'password';
  name: string;
  label: string;
  error: string | null | undefined;
  refObject: RefObject<HTMLInputElement | null>;
}

export default function AuthInput({
  type,
  name,
  label,
  refObject,
  error,
}: AuthInputProps) {
  return (
    <div className="w-3/4">
      <label htmlFor={name} className="block my-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        ref={refObject}
        className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
      />
      {error ? <div className="text-red-500">{error}</div> : null}
    </div>
  );
}
