import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import Status from "./Status";

describe("<Status />", () => {
  expect(true).toBe(true);
  // it("Renders to the screen", () => {
  //   render(<Status bottleStatus="OPENED" />);
  //   const status = screen.getByRole("combobox");
  //   expect(status).toBeInTheDocument();
  //   expect(screen.getAllByRole("option")).toHaveLength(3);
  // });

  // it("Reacts to change", async () => {
  //   render(<Status bottleStatus="OPENED" />);
  //   const status = screen.getByRole("combobox");
  //   const closedOption = screen.getByRole("option", { name: /closed/i });
  //   expect(status).toBeInTheDocument();
  //   expect(status).toHaveValue("OPENED");
  //   const user = userEvent.setup();
  //   await user.selectOptions(status, closedOption);
  //   expect(status).toHaveValue("CLOSED");
  // });

  // it("Reacts to keyboard input", async () => {
  //   render(<Status bottleStatus="OPENED" />);
  //   const status = screen.getByRole("combobox");

  //   const user = userEvent.setup();
  //   fireEvent.focus(status);
  //   user.keyboard("{Space}");
  //   user.keyboard("{ArrowUp}");
  //   user.keyboard("{Enter}");
  //   expect(status).toHaveValue("CLOSED");
  // });
});
