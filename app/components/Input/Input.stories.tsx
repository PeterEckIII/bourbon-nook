import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    label: "Name",
    name: "name",
    error: undefined,
    navigationState: "idle",
    defaultValue: "",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Name",
    name: "name",
    error: undefined,
    navigationState: "idle",
    defaultValue: "Stagg Jr.",
  },
};

export const WithError: Story = {
  args: {
    label: "Name",
    name: "name",
    error: "This field is required.",
    navigationState: "idle",
    defaultValue: "",
  },
};
