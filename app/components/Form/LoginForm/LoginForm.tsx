import { type FieldConfig, conform } from "@conform-to/react";
import { Form, Link, useNavigation, useSearchParams } from "@remix-run/react";
import type { Form as ConformForm } from "~/utils/types";

type LoginFormProps = {
  accountIdentifier: FieldConfig<any>;
  password: FieldConfig<any>;
  redirectTo?: string;
  form: ConformForm;
};

export default function LoginForm({
  accountIdentifier,
  password,
  redirectTo,
  form,
}: LoginFormProps) {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  return (
    <Form method="post" className="space-y-6" {...form.props}>
      <div>
        <label
          htmlFor={accountIdentifier.id}
          className="block text-sm font-medium text-gray-700"
        >
          Email or Username
        </label>
        <div className="mt-1">
          <input
            autoFocus={true}
            aria-invalid={accountIdentifier.error ? true : undefined}
            aria-describedby={accountIdentifier.errorId}
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            {...conform.input(accountIdentifier, { type: "text" })}
          />
          {accountIdentifier.error ? (
            <div
              className="mt-1 w-auto rounded bg-red-200 px-2 py-4 text-red-600 shadow-md"
              id={accountIdentifier.errorId}
              role="alert"
            >
              {accountIdentifier.error}
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

      <input type="hidden" name="redirectTo" value={redirectTo} />
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
        Log in
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>
        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            prefetch="intent"
            className="text-blue-500 underline"
            to={{
              pathname: "/join",
              search: searchParams.toString(),
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </Form>
  );
}
