import NoteField from "./NoteField";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

const setup = () => {
  const utils = render(<NoteField labelName="Strawberry" value={5} />);
  const element = screen.getByLabelText("strawberry-field");
  return {
    element,
    ...utils,
  };
};

describe("<NoteField />", () => {
  test("should first", () => {
    const { element } = setup();
    expect(element).toBeDefined();
    expect(screen.getByText(`Strawberry: 5`)).toBeInTheDocument();
  });
});
