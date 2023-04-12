import type { ErrorBoundaryComponent } from "@remix-run/server-runtime";
import { useCatch } from "@remix-run/react";
import Grid from "~/components/Grids/TestGrid/TestGrid";

export default function GridRoute() {
  return (
    <div className="m-2 w-full rounded bg-white p-4 shadow-lg shadow-blue-700">
      <Grid />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="h-[1000px] w-[500px] bg-white">
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
    <div className="h-[1000px] w-[500px] bg-white">
      <h1>Error!</h1>
      <p>{error.message}</p>
      <p>Stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
};
