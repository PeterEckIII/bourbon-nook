import { unstable_createRemixStub as createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import RadioInput from "./RadioInput";

const meta: Meta<typeof RadioInput> = {
  title: "components/UI/Inputs/RadioInput",
  component: RadioInput,
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([{ path: "/", element: <Story /> }]);
      return <RemixStub />;
    },
  ],
  tags: ["autodocs"],
  argTypes: { onChange: { action: "changed" } },
  args: {
    label: "CLOSED",
    value: true,
    field: "closed",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Unselected: Story = {
  args: {
    value: false,
  },
};

export const Opened: Story = {
  args: {
    label: "OPENED",
    value: true,
    field: "opened",
  },
};

export const Finished: Story = {
  args: {
    label: "FINISHED",
    value: true,
    field: "finished",
  },
};
