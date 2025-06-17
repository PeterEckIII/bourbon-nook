import { Form } from 'react-router';
import AuthInput from '../Inputs/AuthInput';
import type { RefObject } from 'react';

interface RegisterFormProps {
  emailError: string | null | undefined;
  usernameError: string | null | undefined;
  passwordError: string | null | undefined;
  confirmPasswordError: string | null | undefined;
  redirectTo: string;
  emailRef: RefObject<HTMLInputElement | null>;
  usernameRef: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
  confirmPasswordRef: RefObject<HTMLInputElement | null>;
}

export default function RegisterForm({
  emailError,
  usernameError,
  passwordError,
  confirmPasswordError,
  redirectTo,
  emailRef,
  usernameRef,
  passwordRef,
  confirmPasswordRef,
}: RegisterFormProps) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <Form
        method="post"
        className="flex flex-col justify-center items-center border border-black rounded-lg w-1/5 bg-gray-50"
      >
        <h1 className="text-4xl my-4">Register</h1>
        <input
          type="hidden"
          name="redirectTo"
          id="redirectTo"
          value={redirectTo}
        />
        <AuthInput
          type="email"
          name="email"
          label="Email"
          refObject={emailRef}
          error={emailError}
        />
        <AuthInput
          type="text"
          name="username"
          label="Username"
          refObject={usernameRef}
          error={usernameError}
        />
        <AuthInput
          type="password"
          name="password"
          label="Password"
          refObject={passwordRef}
          error={passwordError}
        />
        <AuthInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          refObject={confirmPasswordRef}
          error={confirmPasswordError}
        />
        <div>
          <label htmlFor="remember">Remember me </label>
          <input type="checkbox" name="remember" id="remember" />
        </div>
        <button type="submit">Join</button>
      </Form>
    </div>
  );
}
