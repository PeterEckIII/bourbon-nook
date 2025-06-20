import { Form, Link, useNavigation } from 'react-router';
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
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300 shadow-lg">
      <Form
        method="post"
        className="flex flex-col justify-center items-center border border-black bg-gray-50 rounded-lg w-10/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12"
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
        <div className="my-4">
          <label htmlFor="remember" className="mx-2">
            Remember Me{' '}
          </label>
          <input type="checkbox" name="remember" id="remember" />
        </div>
        <button
          type="submit"
          className="w-3/4 bg-blue-500 text-white py-2 px-4 my-2 rounded-md cursor-pointer hover:bg-blue-600"
        >
          {isNavigating ? 'Logging in...' : 'Login'}
        </button>
        <div className="my-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 underline">
            Register here
          </Link>
        </div>
      </Form>
    </div>
  );
}
