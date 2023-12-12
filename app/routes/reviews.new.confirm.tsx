import { Link } from "@remix-run/react";

export default function NewReviewConfirm() {
  return (
    <div>
      <h1>Hello from the NewReview Confirm route</h1>
      <Link to="/reviews">Back to your reviews</Link>
    </div>
  );
}
