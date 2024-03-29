import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", username: null, password: null } },
      { status: 400 },
    );
  }

  if (typeof username !== "string" || username.length === 0) {
    return json(
      {
        errors: {
          email: null,
          username: "Username is required",
          password: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      {
        errors: {
          email: null,
          password: "Password is required",
          username: null,
        },
      },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      {
        errors: {
          email: null,
          username: null,
          password: "Password is too short",
        },
      },
      { status: 400 },
    );
  }

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return json(
      {
        errors: {
          email: "That email has already been taken",
          password: null,
          username: null,
        },
      },
      { status: 400 },
    );
  }

  const existingUsername = await getUserByUsername(username);
  if (existingUsername) {
    return json(
      {
        errors: {
          email: null,
          password: null,
          username: "That username has already been taken",
        },
      },
      { status: 400 },
    );
  }

  const user = await createUser(email, username, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: MetaFunction = () => [
  { title: "Sign Up" },
  {
    property: "og:title",
    content: "Sign Up",
  },
  {
    property: "og:description",
    content:
      "Sign up for an account to get started with Whiskey Nook and find out the best way to save your collection and reviews!",
  },
];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  return (
    <div className="">
      <div className="">
        <h1 className="text-4xl self-start justify-self-start m-6">
          Join Whiskey Nook!
        </h1>
        <p className="text-xl m-4 border-b border-b-slate-600">
          Whiskey Nook makes it easier than ever to store your collection and
          reviews online.{" "}
        </p>
      </div>
      <div className="flex min-h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-md px-8">
          <Form
            method="post"
            className="space-y-6 rounded-md border border-gray-600 py-16 px-8 bg-orange-200"
          >
            <h3 className="text-2xl font-bold text-center my-3">
              Create an Account
            </h3>
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
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={true}
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.email ? (
                  <div className="pt-1 text-red-700" id="email-error">
                    {actionData.errors.email}
                  </div>
                ) : null}
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
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={true}
                  name="username"
                  type="username"
                  autoComplete="username"
                  aria-invalid={actionData?.errors?.username ? true : undefined}
                  aria-describedby="username-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.username ? (
                  <div className="pt-1 text-red-700" id="username-error">
                    {actionData.errors.username}
                  </div>
                ) : null}
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
                {actionData?.errors?.password ? (
                  <div className="pt-1 text-red-700" id="password-error">
                    {actionData.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

            <input type="hidden" name="redirectTo" value={redirectTo} />
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Create Account
            </button>
            <div className="flex items-center justify-center">
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
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
