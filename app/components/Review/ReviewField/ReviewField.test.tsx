import ReviewField from "./ReviewField";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

const setup = () => {
  const utils = render(
    <ReviewField
      labelName="Palate"
      value="The palate begins with cherries and chocolate before moving on to cinnamon, anise, and some nice rye spice."
    />
  );

  const input = screen.getByLabelText("Palate-field");

  return {
    input,
    ...utils,
  };
};

describe("<ReviewField />", () => {
  test("Should render with provided props", () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(
      screen.getByText(
        `The palate begins with cherries and chocolate before moving on to cinnamon, anise, and some nice rye spice.`
      )
    ).toBeInTheDocument();
  });
});
