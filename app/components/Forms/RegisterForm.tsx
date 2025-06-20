import { Form, Link, useNavigation } from 'react-router';
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
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <Form
        method="post"
        className="flex flex-col justify-center items-center border border-black rounded-lg w-10/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-3/12 bg-gray-50"
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
        <div className="my-4">
          <label htmlFor="remember" className="mx-2">
            Remember me{' '}
          </label>
          <input type="checkbox" name="remember" id="remember" />
        </div>
        <button
          type="submit"
          className="w-3/4 bg-blue-500 text-white py-2 px-4 my-2 rounded-md cursor-pointer hover:bg-blue-600"
        >
          {isNavigating ? 'Registering...' : 'Register'}
        </button>
        <div className="my-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 underline">
            Login here
          </Link>
        </div>
      </Form>
    </div>
  );
}
