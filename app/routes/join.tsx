import type { ActionArgs, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import {
  useSearchParams,
  useActionData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { createUserSession } from "../session.server";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "../models/user.server";
import RegisterForm from "../components/Form/RegisterForm";

import { z } from "zod";
import { parse } from "@conform-to/zod";
import { useForm } from "@conform-to/react";

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export const registerSchema = z
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
    confirmPassword: z.string().min(1, "Confirm password is required"),
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

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: registerSchema
      .refine(
        async (data) => {
          return await isEmailUnique(data.email);
        },
        {
          path: ["email"],
          message: `That email address has already been registered. Please enter a new one or navigate to the login page`,
        }
      )
      .refine(
        async (data) => {
          return await isUsernameUnique(data.username);
        },
        {
          path: ["username"],
          message: `That username has already been taken. Please choose another`,
        }
      ),
    async: true,
  });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission);
  }

  try {
    const user = await createUser(
      submission.payload.email,
      submission.payload.username,
      submission.payload.password
    );
    return createUserSession({
      redirectTo: submission.payload.redirectTo,
      remember: false,
      request,
      userId: user.id,
    });
  } catch (error) {
    return json({
      ...submission,
      error: {
        "": "An error occurred while creating your account. Please try again later.",
      },
    });
  }
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const lastSubmission = useActionData<typeof action>();
  const [form, { email, username, password, confirmPassword }] = useForm<
    z.input<typeof registerSchema>
  >({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: registerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
  });

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="flex w-[75%] flex-col items-center justify-center rounded bg-white pb-10 pt-6 shadow-lg shadow-blue-700 md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <div className="mx-auto w-full px-8">
          <h1 className="my-6 self-start text-3xl">Sign Up</h1>
          <RegisterForm
            form={form}
            email={email}
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
}

export async function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = "Unknown error";

  if (typeof error !== "undefined" && error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh...</h1>
      <p>Something went wrong</p>
      <p>{errorMessage}</p>
    </div>
  );
}
