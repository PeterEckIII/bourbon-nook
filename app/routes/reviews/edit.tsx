import { Outlet } from "@remix-run/react";

export default function EditReviewPage() {
  return (
    <div className="m-4 p-4">
      <h1>Edit Review</h1>
      <Outlet />
    </div>
  );
}
