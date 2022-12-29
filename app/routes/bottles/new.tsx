import * as React from "react";
import { Outlet, useCatch } from "@remix-run/react";
import type { ErrorBoundaryComponent } from "@remix-run/server-runtime";
import type { Status } from "../reviews/new";

export type FormState = {
  name: string;
  status: Status;
  type: string;
  distiller: string;
  producer: string;
  country: string;
  region: string;
  price: string;
  age: string;
  year: string;
  batch: string;
  alcoholPercent: string;
  proof: string;
  size: string;
  color: string;
  finishing: string;
  imageUrl?: string;
};

export type BottleContextType = {
  state: FormState;
  stateSetter?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFormState?: React.Dispatch<React.SetStateAction<FormState>>;
};

const initialState: FormState = {
  name: "",
  status: "CLOSED",
  type: "",
  distiller: "",
  producer: "",
  country: "",
  region: "",
  price: "",
  age: "",
  year: "",
  batch: "",
  alcoholPercent: "",
  proof: "",
  size: "",
  color: "",
  finishing: "",
};

export default function NewBottleRoute() {
  const [formState, setFormState] = React.useState<FormState>(initialState);

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const context: BottleContextType = {
    state: formState,
    stateSetter: handleValueChange,
    setFormState: setFormState,
  };

  return (
    <div className="m-4 w-full p-4">
      <Outlet context={context} />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>Caught!</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div>
      <h1>Error!</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
};
