import { Outlet } from "@remix-run/react";

export default function BottlesPage() {
  return (
    <main className="flex h-full w-full justify-center bg-blue-500 p-6">
      <Outlet />
    </main>
  );
}
