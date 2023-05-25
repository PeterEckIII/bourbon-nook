import { unstable_createRemixStub as createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "components/UI/Button",
  component: Button,
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([{ path: "/", element: <Story /> }]);
      return <RemixStub />;
    },
  ],
  tags: ["autodocs"],
  args: {
    callToAction: "Submit",
    type: "submit",
    primary: true,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    primary: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CenterAligned: Story = {
  args: {
    position: "middle",
  },
};

export const RightAligned: Story = {
  args: {
    position: "right",
  },
};
