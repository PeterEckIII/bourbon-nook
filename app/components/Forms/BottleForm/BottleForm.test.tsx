import { screen, render, waitFor } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
import { select } from "react-select-event";
import { describe, it, expect } from "vitest";

import BottleForm, { Inputs } from "./BottleForm";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.userEvent.setup(),
    ...render(jsx),
    payload: {
      name: screen.getByLabelText("Name"),
      status: screen.getByLabelText("Status"),
      type: screen.getByLabelText("Spirit Type"),
      distiller: screen.getByLabelText("Distillery"),
      producer: screen.getByLabelText("Producer"),
      country: screen.getByLabelText("Country of Origin"),
      region: screen.getByLabelText("Region"),
      price: screen.getByLabelText("Price"),
      age: screen.getByLabelText("Age"),
      year: screen.getByLabelText("Release Year"),
      batch: screen.getByLabelText("Batch"),
      barrel: screen.getByLabelText("Barrel #"),
      alcoholPercent: screen.getByLabelText("ABV"),
      proof: screen.getByLabelText("Proof"),
      size: screen.getByLabelText("Bottle Size"),
      color: screen.getByLabelText("Color"),
      finishing: screen.getByLabelText("Finishing Barrels"),
      imageUrl: screen.getByLabelText("Image URL"),
      openDate: screen.getByLabelText("Bottle opened on"),
      killDate: screen.getByLabelText("Bottle finished on"),
    },
  };
}

const inputs: Inputs = {
  name: {
    id: "name",
    name: "name",
  },
  status: {
    id: "status",
    name: "status",
  },
  type: {
    id: "type",
    name: "type",
  },
  distiller: {
    id: "distiller",
    name: "distiller",
  },
  producer: {
    id: "producer",
    name: "producer",
  },
  country: {
    id: "country",
    name: "country",
  },
  region: {
    id: "region",
    name: "region",
  },
  price: {
    id: "price",
    name: "price",
  },
  age: {
    id: "age",
    name: "age",
  },
  year: {
    id: "year",
    name: "year",
  },
  batch: {
    id: "batch",
    name: "batch",
  },
  barrel: {
    id: "barrel",
    name: "barrel",
  },
  alcoholPercent: {
    id: "alcoholPercent",
    name: "alcoholPercent",
  },
  proof: {
    id: "proof",
    name: "proof",
  },
  size: {
    id: "size",
    name: "size",
  },
  color: {
    id: "color",
    name: "color",
  },
  finishing: {
    id: "finishing",
    name: "finishing",
  },
  imageUrl: {
    id: "imageUrl",
    name: "imageUrl",
  },
  openDate: {
    id: "openDate",
    name: "openDate",
  },
  killDate: {
    id: "killDate",
    name: "killDate",
  },
};

describe("<BottleForm />", () => {
  it("Renders to the screen", () => {
    const { payload } = setup(
      <BottleForm inputs={inputs} navigationState="idle" />,
    );

    expect(payload.name).toBeInTheDocument();
    expect(payload.status).toBeInTheDocument();
    expect(payload.type).toBeInTheDocument();
    expect(payload.distiller).toBeInTheDocument();
    expect(payload.producer).toBeInTheDocument();
    expect(payload.country).toBeInTheDocument();
    expect(payload.region).toBeInTheDocument();
    expect(payload.price).toBeInTheDocument();
    expect(payload.age).toBeInTheDocument();
    expect(payload.year).toBeInTheDocument();
    expect(payload.batch).toBeInTheDocument();
    expect(payload.barrel).toBeInTheDocument();
    expect(payload.alcoholPercent).toBeInTheDocument();
    expect(payload.proof).toBeInTheDocument();
    expect(payload.size).toBeInTheDocument();
    expect(payload.color).toBeInTheDocument();
    expect(payload.finishing).toBeInTheDocument();
    expect(payload.imageUrl).toBeInTheDocument();
    expect(payload.openDate).toBeInTheDocument();
    expect(payload.killDate).toBeInTheDocument();
  });
  it("Successfully submits a full payload", async () => {
    const { user, payload } = setup(
      <div>
        <form action="" aria-label="New bottle form">
          <BottleForm inputs={inputs} navigationState="idle" />,
          <button type="submit">Submit</button>
        </form>
      </div>,
    );

    await user.type(screen.getByLabelText("Name"), "Buffalo Trace");

    await waitFor(async () =>
      select(screen.getByLabelText("Status"), "Finished"),
    );
    await user.type(payload.type, "Bourbon"),
      await user.type(payload.distiller, "Buffalo Trace");
    await user.type(payload.producer, "Sazerac");
    await user.type(payload.country, "USA");
    await user.type(payload.region, "Kentucky");
    await user.type(payload.price, "30");
    await user.type(payload.age, "10");
    await user.type(payload.year, "2010");
    await user.type(payload.batch, "1");
    await user.type(payload.barrel, "1");
    await user.type(payload.alcoholPercent, "45");
    await user.type(payload.proof, "90");
    await user.type(payload.size, "750");
    await user.type(payload.color, "Amber");
    await user.type(payload.finishing, "None");
    await user.type(payload.imageUrl, "https://example.com/image.jpg");
    await user.type(payload.openDate, "1/9/2022");
    await user.type(payload.killDate, "6/13/2023");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      screen.getByRole("form", { name: "New bottle form" }),
    ).toHaveFormValues({
      name: "Buffalo Trace",
      status: "FINISHED",
      type: "Bourbon",
      distiller: "Buffalo Trace",
      producer: "Sazerac",
      country: "USA",
      region: "Kentucky",
      price: "30",
      age: "10",
      year: "2010",
      batch: "1",
      barrel: "1",
      alcoholPercent: "45",
      proof: "90",
      size: "750",
      color: "Amber",
      finishing: "None",
      imageUrl: "https://example.com/image.jpg",
      openDate: "1/9/2022",
      killDate: "6/13/2023",
    });
  });
});
