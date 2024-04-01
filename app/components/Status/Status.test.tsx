import { screen, render, waitFor } from "@testing-library/react";
import * as userEvent from "@testing-library/user-event";
// import { select } from "react-select-event";
import { describe, it, expect } from "vitest";

import Status from "./Status";

function setup(jsx: JSX.Element) {
  return {
    user: userEvent.userEvent.setup(),
    ...render(jsx),
  };
}

describe("<Status />", () => {
  it("Renders to the screen", async () => {
    setup(
      <form action="" aria-label="Status form">
        <Status />
      </form>,
    );
    expect(screen.getByText("Opened")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveFormValues({ status: "OPENED" });
  });
  it("Selects the correct value on change", async () => {
    const { user } = setup(
      <form action="" aria-label="Status form">
        <Status />
      </form>,
    );
    await waitFor(async () => {
      screen.getByLabelText("Status").focus();
      await user.keyboard("[ArrowDown]");
      await user.click(screen.getByText("Finished"));
    });

    expect(screen.getByRole("form")).toHaveFormValues({ status: "FINISHED" });
  });
  // it("Selects the correct value with react-select-event", async () => {
  //   setup(
  //     <form action="" aria-label="Status form">
  //       <Status />
  //     </form>,
  //   );
  //   await waitFor(async () =>
  //     select(screen.getByLabelText("Status"), "Finished"),
  //   );
  //   expect(screen.getByRole("form")).toHaveFormValues({ status: "FINISHED" });
  // });
});
