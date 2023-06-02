import { Outlet } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";

export const action = async ({ request }: ActionArgs) => {
  return null;
};

export default function ReviewsPage() {
  return (
    <main className="flex h-full w-full justify-center bg-blue-500 p-6">
      <Outlet />
    </main>
  );
}
