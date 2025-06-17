import { Form } from 'react-router';
import AuthInput from '../Inputs/AuthInput';
import type { RefObject } from 'react';

type LoginFormProps = {
  usernameError: string | null | undefined;
  passwordError: string | null | undefined;
  redirectTo: string;
  usernameRef: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
};

export default function LoginForm({
  usernameError,
  passwordError,
  usernameRef,
  passwordRef,
  redirectTo,
}: LoginFormProps) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <Form
        method="post"
        className="flex flex-col justify-center items-center border border-black bg-gray-50 rounded-lg w-1/5"
      >
        <h1 className="text-4xl my-4">Login</h1>
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
        <input
          type="hidden"
          name="redirectTo"
          id="redirectTo"
          value={redirectTo}
        />
        <div>
          <label htmlFor="remember" className="mx-2">
            Remember Me
          </label>
          <input type="checkbox" name="remember" id="remember" />
        </div>
        <button
          className="bg-blue-500 py-2 px-4 my-2 rounded-md cursor-pointer hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </Form>
    </div>
  );
}
