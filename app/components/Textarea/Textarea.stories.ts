import type { Meta, StoryObj } from "@storybook/react";

import Textarea from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {
    label: "Nose",
    name: "nose",
    error: undefined,
    navigationState: "idle",
    defaultValue: "",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Nose",
    name: "nose",
    error: undefined,
    navigationState: "idle",
    defaultValue: "Cherry, oak, and spice with leather and tobacco notes.",
  },
};

export const WithError: Story = {
  args: {
    label: "Nose",
    name: "nose",
    error: "This field is required.",
    navigationState: "idle",
    defaultValue: "",
  },
};
