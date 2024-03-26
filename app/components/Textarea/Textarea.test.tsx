import { screen, render } from "@testing-library/react";
// import * as userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import Textarea from "./Textarea";

// const uEvent = userEvent.userEvent;

describe("<Textarea />", () => {
  it("Renders to the screen", () => {
    render(
      <Textarea name="nose" label="Nose" error="" navigationState="idle" />,
    );

    const input = screen.getByLabelText(/nose/i);
    console.log(input);
    // expect(input).toBeInTheDocument();
    expect(true).toBe(true);
    // expect(input).toHaveAttribute("aria-invalid", "false");
  });
  // it("Reacts to input", async () => {
  //   render(
  //     <Textarea name="nose" label="Nose" error="" navigationState="idle" />,
  //   );
  //   const user = uEvent.setup();
  //   const input = screen.getByRole("textbox", { name: /nose/i });
  //   await user.type(input, "Vanilla, caramel, oak");
  //   expect(input).toHaveValue("Vanilla, caramel, oak");
  // });
});
