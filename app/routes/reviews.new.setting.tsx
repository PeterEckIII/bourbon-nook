import { LoaderFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { redirect } from "remix-typedjson";

import { requireUserId } from "~/session.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const userId = requireUserId(request);
  if (!userId) {
    return redirect("/login");
  }
};

export default function NewReviewSetting() {
  return (
    <div>
      <h1>Hello from the NewReview Setting route</h1>
      <Link to="/reviews/new/notes">Review Notes</Link>
    </div>
  );
}
