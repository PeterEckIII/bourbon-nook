import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    onClick: fn(),
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Submit",
    primary: true,
    onClick: fn(),
    loading: false,
    loadingText: undefined,
    error: undefined,
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export const Secondary: Story = {
  args: {
    label: "Cancel",
    primary: false,
    onClick: fn(),
    loading: false,
    loadingText: undefined,
    error: undefined,
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export const Loading: Story = {
  args: {
    label: "Submit",
    primary: true,
    onClick: fn(),
    loading: true,
    loadingText: "Submitting...",
    error: undefined,
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export const WithError: Story = {
  args: {
    label: "Submit",
    primary: true,
    onClick: fn(),
    loading: false,
    loadingText: undefined,
    error: "Something went wrong",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};
