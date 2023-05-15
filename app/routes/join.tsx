import type { ActionFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useTransition,
} from "@remix-run/react";
import { createUserSession } from "~/session.server";

import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "~/models/user.server";
import { z } from "zod";
import { parse } from "@conform-to/zod";
import { conform, useForm } from "@conform-to/react";

const schema = z
  .object({
    email: z
      .string()
      .min(1, `Email is required`)
      .email(`Please enter a valid email address`),
    username: z.string().min(1, `Username is required`),
    password: z
      .string()
      .min(8, `Your password needs to be at least 8 characters`)
      .regex(
        /(?=.*[a-z])(?=.*?[A-Z]).*/,
        `Your password must have at least one uppercase and one lowercase character`
      ),
    redirectTo: z.optional(z.string()),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: `Passwords do not match`,
  });

async function isEmailUnique(email: string) {
  const emailTaken = await getUserByEmail(email);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(emailTaken?.email !== email);
    }, 300);
  });
}

async function isUsernameUnique(username: string) {
  const usernameTaken = await getUserByUsername(username);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usernameTaken?.username !== username);
    }, 300);
  });
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: schema
      .refine(async (data) => await isEmailUnique(data.email), {
        path: ["email"],
        message: `That email address has already been registered. Please enter a new one or navigate to the login page`,
      })
      .refine(async (data) => await isUsernameUnique(data.username), {
        path: ["username"],
        message: `That username is already in use. Please choose another`,
      }),
    async: true,
  });
  if (!submission.value?.email || submission.intent !== "submit") {
    return json(
      { ...submission, payload: { email: submission.payload.email } },
      { status: 400 }
    );
  }
  if (!submission.value?.username || submission.intent !== "submit") {
    return json(
      { ...submission, payload: { username: submission.payload.username } },
      { status: 400 }
    );
  }

  try {
    const user = await createUser(
      submission.value?.email,
      submission.value?.username,
      submission.value?.password
    );
    return createUserSession({
      request,
      userId: user.id,
      remember: false,
      redirectTo: submission.value?.redirectTo
        ? submission.value?.redirectTo
        : "/bottles",
    });
  } catch (error) {
    throw new Error(`Could not submit form ${JSON.stringify(error)}`);
  }
};

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const lastSubmission = useActionData<typeof action>();
  const transition = useTransition();

  const [form, { email, username, password, confirmPassword }] = useForm<
    z.input<typeof schema>
  >({
    id: "join",
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="flex w-[75%] flex-col items-center justify-center rounded bg-white pb-10 pt-6 shadow-lg shadow-blue-700 md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <div className="mx-auto w-full px-8">
          <h1 className="my-6 self-start text-3xl">Sign Up</h1>
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
                    className="mt-1 w-auto rounded bg-red-200 py-4 px-2 text-red-600 shadow-md"
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
                    className="mt-1 w-auto rounded bg-red-200 py-4 px-2 text-red-600 shadow-md"
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
                    className="mt-1 w-auto rounded bg-red-200 py-4 px-2 text-red-600 shadow-md"
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
                    className="mt-1 w-auto rounded bg-red-200 py-4 px-2 text-red-600 shadow-md"
                    id={confirmPassword.errorId}
                    role="alert"
                  >
                    {confirmPassword.error}
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
        </div>
      </div>
    </div>
  );
}
