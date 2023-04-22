import * as React from "react";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useTransition,
} from "@remix-run/react";
import { getUserId, createUserSession } from "~/session.server";

import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "~/models/user.server";
import { validateEmail } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors: {
    email?: string;
    username?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400, statusText: "Email is invalid" }
    );
  }

  if (typeof password !== "string") {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400, statusText: "Password is required" }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400, statusText: "Password is too short" }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email" } },
      { status: 400, statusText: "A user already exists with this email" }
    );
  }

  if (typeof username === "string") {
    const existingUsername = await getUserByUsername(username);
    if (existingUsername) {
      return json<ActionData>(
        {
          errors: {
            username: "That username is already in use. Please choose another",
          },
        },
        {
          status: 400,
          statusText: "That username is already in use. Please choose another",
        }
      );
    }
    const user = await createUser(email, username, password);
    return createUserSession({
      request,
      userId: user.id,
      remember: false,
      redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
    });
  } else {
    return json<ActionData>(
      {
        errors: {
          username: "Username is blank. Please enter a username to continue",
        },
      },
      {
        status: 400,
        statusText: "Username is blank. Please enter a username to continue",
      }
    );
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
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const transition = useTransition();

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="flex w-[75%] flex-col items-center justify-center rounded bg-white pb-10 pt-6 shadow-lg shadow-blue-700 md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <div className="mx-auto w-full px-8">
          <h1 className="my-6 self-start text-3xl">Sign Up</h1>
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  ref={emailRef}
                  id="email"
                  required
                  autoFocus={true}
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.email && (
                  <div className="pt-1 text-red-700" id="email-error">
                    {actionData.errors.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  ref={usernameRef}
                  id="username"
                  required
                  autoFocus={true}
                  name="username"
                  type="text"
                  autoComplete="username"
                  aria-invalid={actionData?.errors?.username ? true : undefined}
                  aria-describedby="username-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.username && (
                  <div className="pt-1 text-red-700" id="username-error">
                    {actionData.errors.username}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  ref={passwordRef}
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={actionData?.errors?.password ? true : undefined}
                  aria-describedby="password-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.password && (
                  <div className="pt-1 text-red-700" id="password-error">
                    {actionData.errors.password}
                  </div>
                )}
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
