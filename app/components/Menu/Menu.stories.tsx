import type { Meta, StoryObj } from "@storybook/react";

import Menu from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Primary: Story = {
  argTypes: {},
  args: {
    user: {
      id: "1",
      email: "test@email.com",
      username: "test",
      createdAt: "2022-01-01T00:00:00.000Z",
      updatedAt: "2022-01-01T00:00:00.000Z",
    },
    open: false,
    setOpen: () => {
      console.log("setOpen");
    },
  },
};
