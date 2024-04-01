import type { Meta, StoryObj } from "@storybook/react";

import Status from "./Status";

const meta: Meta<typeof Status> = {
  title: "Components/Status",
  component: Status,
};

export default meta;

type Story = StoryObj<typeof Status>;

export const Primary: Story = {
  args: {},
};
