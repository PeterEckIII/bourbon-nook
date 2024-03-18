import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { redirect } from "remix-typedjson";

import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  if (!userId) {
    return redirect("/login");
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  return userId;
};

export default function NewReview() {
  return (
    <div>
      <h1>Hello NewReview Route!</h1>
      <Outlet />
    </div>
  );
}
