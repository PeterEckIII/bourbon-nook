import * as React from "react";
import { Outlet, useCatch } from "@remix-run/react";
import type { ErrorBoundaryComponent } from "@remix-run/server-runtime";

export type Status = "CLOSED" | "OPENED" | "FINISHED";

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
  imageUrl: string;
  openDate: string;
  killDate: string;

  date: string;
  setting: string;
  glassware: string;
  restTime: string;
  nose: string;
  palate: string;
  finish: string;
  thoughts: string;
  cherry: number;
  strawberry: number;
  raspberry: number;
  blackberry: number;
  blueberry: number;
  apple: number;
  banana: number;
  grape: number;
  stone: number;
  citrus: number;
  tropical: number;
  pepper: number;
  bakingSpice: number;
  cinnamon: number;
  herbal: number;
  mint: number;
  coffee: number;
  tobacco: number;
  leather: number;
  oak: number;
  toasted: number;
  smokey: number;
  peanut: number;
  almond: number;
  pecan: number;
  walnut: number;
  oily: number;
  floral: number;
  corn: number;
  rye: number;
  wheat: number;
  malt: number;
  dough: number;
  vanilla: number;
  caramel: number;
  molasses: number;
  butterscotch: number;
  honey: number;
  chocolate: number;
  toffee: number;
  sugar: number;
  overallRating: number;
  value: number;
};

export type ReviewContextType = {
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
  imageUrl: "",
  openDate: "",
  killDate: "",

  date: "",
  setting: "",
  glassware: "",
  restTime: "",
  nose: "",
  palate: "",
  finish: "",
  thoughts: "",
  cherry: 0,
  strawberry: 0,
  raspberry: 0,
  blackberry: 0,
  blueberry: 0,
  apple: 0,
  banana: 0,
  grape: 0,
  stone: 0,
  citrus: 0,
  tropical: 0,
  pepper: 0,
  bakingSpice: 0,
  cinnamon: 0,
  herbal: 0,
  mint: 0,
  coffee: 0,
  tobacco: 0,
  leather: 0,
  oak: 0,
  toasted: 0,
  smokey: 0,
  peanut: 0,
  almond: 0,
  pecan: 0,
  walnut: 0,
  oily: 0,
  floral: 0,
  corn: 0,
  rye: 0,
  wheat: 0,
  malt: 0,
  dough: 0,
  vanilla: 0,
  caramel: 0,
  molasses: 0,
  butterscotch: 0,
  honey: 0,
  chocolate: 0,
  toffee: 0,
  sugar: 0,
  overallRating: 0,
  value: 0,
};

export default function NewReviewPage() {
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

  const context: ReviewContextType = {
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
    <div className="m-4 flex flex-col justify-center">
      <h1>Error!</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
};
