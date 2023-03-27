import type { ErrorBoundaryComponent } from "@remix-run/server-runtime";
import { useCatch } from "@remix-run/react";
import Table from "~/components/Grids/TestGrid/NewTestGrid";
import Grid from "~/components/Grids/TestGrid/TestGrid";

export default function GridRoute() {
  return (
    <div className="overflow-x-scroll rounded bg-white shadow-lg shadow-blue-500">
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
