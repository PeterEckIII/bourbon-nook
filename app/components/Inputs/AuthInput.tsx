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
    <div>
      <label htmlFor={name} className="block my-2">
        {label}
      </label>
      <input type={type} name={name} id={name} ref={refObject} />
      {error ? <div className="text-red-500">{error}</div> : null}
    </div>
  );
}
