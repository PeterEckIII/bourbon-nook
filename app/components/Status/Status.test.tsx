import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Status from "./Status";

describe("<Status />", () => {
  it("Renders to the screen", () => {
    render(<Status bottleStatus="OPENED" />);
    const status = screen.getByRole("combobox");
    expect(status).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });
});
