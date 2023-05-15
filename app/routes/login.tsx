import { json } from "@remix-run/server-runtime";
import type { ActionFunction, MetaFunction } from "@remix-run/server-runtime";
import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import { createUserSession } from "~/session.server";
import { verifyLogin, verifyWithUsername } from "~/models/user.server";
import { parse } from "@conform-to/zod";
import { z } from "zod";
import { conform, useForm } from "@conform-to/react";

const schema = z.object({
  accountIdentifier: z.string(),
  password: z.string(),
  redirectTo: z.string().optional(),
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (!submission.value) {
    console.log(`No submission value!`);
    return json(submission, { status: 400 });
  }

  let user;

  if (submission.value.accountIdentifier.match(/^\S+@\S+$/)) {
    user = await verifyLogin(
      submission.value.accountIdentifier,
      submission.value.password
    );
  } else {
    user = await verifyWithUsername(
      submission.value.accountIdentifier,
      submission.value.password
    );
  }

  if (!user) {
    console.log(`No user!`);
    return json(submission, { status: 400 });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: submission.value?.redirectTo ?? "/bottles",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const lastSubmission = useActionData<typeof action>();
  const [form, { accountIdentifier, password }] = useForm<
    z.input<typeof schema>
  >({
    lastSubmission,
    id: "login",
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/reviews";
  const transition = useTransition();

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="flex w-[70%] flex-col items-center justify-center rounded bg-white pb-10 pt-6 shadow-lg shadow-blue-700 md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <div className="mx-auto w-full px-8">
          <h1 className="my-6 self-start text-3xl">Login</h1>
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
                    className="mt-1 w-auto rounded bg-red-200 py-4 px-2 text-red-600 shadow-md"
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
                    className="mt-1 w-auto rounded bg-red-200 py-4 px-2 text-red-600 shadow-md"
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
              className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              disabled={
                transition.state === "submitting" ||
                transition.state === "loading"
              }
              aria-disabled={
                transition.state === "submitting" ||
                transition.state === "loading"
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
        </div>
      </div>
    </div>
  );
}
