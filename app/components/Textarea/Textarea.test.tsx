import { screen, render } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import Textarea from "./Textarea";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.userEvent.setup(),
    ...render(jsx),
  };
}

describe("<Textarea />", () => {
  it("Renders to the screen", () => {
    setup(
      <Textarea name="nose" label="Nose" error="" navigationState="idle" />,
    );
    const input = screen.getByLabelText(/nose/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "nose");
    expect(input).toHaveAttribute("aria-label", "Nose");
  });
  it("Reacts to input change", async () => {
    const { user } = setup(
      <Textarea name="nose" label="Nose" error="" navigationState="idle" />,
    );
    const input = screen.getByLabelText(/nose/i);
    await user.type(input, "This is a test");
    expect(input).toHaveValue("This is a test");
  });
  it("Displays an error message", () => {
    setup(
      <Textarea
        name="nose"
        label="Nose"
        error="This is an error"
        navigationState="idle"
      />,
    );
    expect(screen.getByText("This is an error")).toBeInTheDocument();
  });
});
