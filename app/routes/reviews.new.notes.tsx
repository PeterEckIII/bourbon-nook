import { Link } from "@remix-run/react";

export default function NewReviewNotes() {
  return (
    <div>
      <h1>Hello from the NewReview Notes route</h1>
      <Link to="/reviews/new/confirm">Confirm Review</Link>
    </div>
  );
}
