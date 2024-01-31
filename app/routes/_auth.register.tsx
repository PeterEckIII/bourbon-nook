import { type ActionFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { validateEmail } from "~/utils";

interface ActionData {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  const errors: ActionData = {
    email:
      email && validateEmail(email)
        ? null
        : email && !validateEmail(email)
        ? "Email is formatted incorrectly. Please ensure it has an `@` symbol and is reachable for confirmation"
        : "Email is a required field",
    password:
      password && password.length > 8
        ? null
        : password && password.length < 8
        ? "Password must be at least 8 characters"
        : "Password is a required field",
    confirmPassword:
      password === confirmPassword ? null : "Passwords do not match",
  };

  const hasErrors = Object.values(errors).some((v) => v);

  if (hasErrors) {
    return json<ActionData>(errors);
  }
};

export default function Register() {
  return (
    <Form action="post">
      <input type="email" name="email" />
      <input type="password" name="password" />
      <input type="confirmPassword" name="confirmPassword" />
      <button type="submit">Submit</button>
    </Form>
  );
}
