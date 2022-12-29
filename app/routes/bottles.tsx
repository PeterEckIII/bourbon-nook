import { Outlet } from "@remix-run/react";

export default function BottlesPage() {
  return (
    <main className="flex h-full bg-white" aria-roledescription="aside">
      <div className="flex w-full justify-center p-6">
        <Outlet />
      </div>
    </main>
  );
}
