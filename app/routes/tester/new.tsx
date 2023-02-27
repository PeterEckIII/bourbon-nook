import { Outlet, useCatch } from "@remix-run/react";
import type { ErrorBoundaryComponent } from "@remix-run/server-runtime";

export default function NewTesterRouter() {
  return (
    <>
      <Outlet />
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="h-[1000px] w-[500px]">
      <h1>Caught</h1>
      <p>Status: {caught.status} </p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="h-[1000px] w-[500px]">
      <h1>Error!</h1>
      <p>{error.message}</p>
      <p>Stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
};
