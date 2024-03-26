import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
// import { redirect } from "remix-typedjson";

import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return null;
};

export default function NewReviewNotes() {
  return (
    <div>
      <h1>Hello from the NewReview Notes route</h1>
      <Link to="/reviews/new/confirm">Confirm Review</Link>
    </div>
  );
}
