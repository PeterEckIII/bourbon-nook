import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ValidationMessage from "./ValidationMessage";

describe("<ValidationMessage />", () => {
  it("Renders to the screen", () => {
    render(
      <ValidationMessage error="Something went wrong" isSubmitting={false} />,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
