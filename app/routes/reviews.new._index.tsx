import type { ActionFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { requireUserId } from "~/session.server";

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
