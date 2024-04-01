import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("<Button />", () => {
  it("Renders to the screen", async () => {
    const onclick = vi.fn();
    render(<Button primary label="Submit" onClick={onclick} type="submit" />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
  it("Responds to click", async () => {
    const onclick = vi.fn();
    render(<Button primary label="Submit" onClick={onclick} type="submit" />);
    screen.getByText("Submit").click();
    expect(onclick).toHaveBeenCalledTimes(1);
  });
  it("Shows loading text", async () => {
    const onclick = vi.fn();
    render(
      <Button
        primary
        label="Submit"
        onClick={onclick}
        loading
        loadingText="Loading..."
        type="submit"
      />,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  test("Shows error text", async () => {
    const onclick = vi.fn();
    render(
      <Button
        primary
        label="Submit"
        onClick={onclick}
        error="An error occurred"
        type="submit"
      />,
    );
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });
});
