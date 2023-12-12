import { Link } from "@remix-run/react";

export default function NewReviewSetting() {
  return (
    <div>
      <h1>Hello from the NewReview Setting route</h1>
      <Link to="/reviews/new/notes">Review Notes</Link>
    </div>
  );
}
