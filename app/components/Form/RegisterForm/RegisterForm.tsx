import { type FieldConfig } from "@conform-to/react";
import { Form, Link, useNavigation } from "@remix-run/react";
import { conform } from "@conform-to/react";
import type { URLSearchParams } from "url";
import type { Form as ConformForm } from "~/utils/types";

type RegisterFormProps = {
  email: FieldConfig<any>;
  username: FieldConfig<any>;
  password: FieldConfig<any>;
  confirmPassword: FieldConfig<any>;
  searchParams: URLSearchParams;
  form: ConformForm;
};

export default function RegisterForm({
  searchParams,
  email,
  username,
  password,
  confirmPassword,
  form,
}: RegisterFormProps) {
  const navigation = useNavigation();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <Form method="post" className="space-y-6" {...form.props}>
      <div>
        <label
          htmlFor={email.id}
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            autoComplete="email"
            aria-invalid={email.error ? true : undefined}
            aria-describedby={email.errorId}
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            {...conform.input(email, { type: "email" })}
          />
          {email.error ? (
            <div
              className="mt-1 w-auto rounded bg-red-200 px-2 py-4 text-red-600 shadow-md"
              id={email.errorId}
              role="alert"
            >
              {email.error}
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={username.id}
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <div className="mt-1">
          <input
            autoComplete="username"
            aria-invalid={username.error ? true : undefined}
            aria-describedby={username.errorId}
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            {...conform.input(username, { type: "text" })}
          />
          {username.error ? (
            <div
              className="mt-1 w-auto rounded bg-red-200 px-2 py-4 text-red-600 shadow-md"
              id={username.errorId}
              role="alert"
            >
              {username.error}
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={password.id}
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            autoComplete="new-password"
            aria-invalid={password.error ? true : undefined}
            aria-describedby={password.errorId}
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            {...conform.input(password, { type: "password" })}
          />
          {password.error ? (
            <div
              className="mt-1 w-auto rounded bg-red-200 px-2 py-4 text-red-600 shadow-md"
              id={password.errorId}
              role="alert"
            >
              {password.error}
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={confirmPassword.id}
          className="block text-sm font-medium text-gray-700"
        >
          Re-enter Password
        </label>
        <div className="mt-1">
          <input
            autoComplete="confirm-password"
            aria-invalid={confirmPassword.error ? true : undefined}
            aria-describedby={confirmPassword.errorId}
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            {...conform.input(confirmPassword, { type: "password" })}
          />
          {confirmPassword.error ? (
            <div
              className="mt-1 w-auto rounded bg-red-200 px-2 py-4 text-red-600 shadow-md"
              id={confirmPassword.errorId}
              role="alert"
            >
              {confirmPassword.error}
            </div>
          ) : null}
        </div>
      </div>

      <input type="hidden" name="redirectTo" value={redirectTo ?? "/bottles"} />
      <button
        type="submit"
        className="w-full rounded bg-blue-500  px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        disabled={
          navigation.state === "submitting" || navigation.state === "loading"
        }
        aria-disabled={
          navigation.state === "submitting" || navigation.state === "loading"
        }
      >
        Create Account
      </button>
      <div className="flex items-center justify-center">
        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            prefetch="intent"
            className="text-blue-500 underline"
            to={{
              pathname: "/login",
              search: searchParams.toString(),
            }}
          >
            Log in
          </Link>
        </div>
      </div>
    </Form>
  );
}
