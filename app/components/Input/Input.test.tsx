import { screen, render } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import Input from "./Input";

const uEvent = userEvent.userEvent;

describe("<Input />", () => {
  it("Renders to the screen", () => {
    render(
      <Input
        name="name"
        placeholder="Name"
        label="Name"
        error=""
        navigationState="idle"
      />,
    );

    const input = screen.getByLabelText(/name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("Reacts to input", async () => {
    render(
      <Input
        name="name"
        placeholder="Name"
        label="Name"
        error=""
        navigationState="idle"
      />,
    );
    const user = uEvent.setup();
    const input = screen.getByRole("textbox", { name: /name/i });
    await user.type(input, "Buffalo Trace");
    expect(input).toHaveValue("Buffalo Trace");
  });
  it("Shows error message if triggered", () => {
    render(
      <Input
        name="name"
        placeholder="Name"
        label="Name"
        error="Error"
        navigationState="idle"
      />,
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
