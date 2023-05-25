import { unstable_createRemixStub as createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import StatusInput from "./StatusInput";

const meta: Meta<typeof StatusInput> = {
  title: "components/UI/Inputs/StatusInput",
  component: StatusInput,
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([{ path: "/", element: <Story /> }]);
      return <RemixStub />;
    },
  ],
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
  args: {
    loadedStatus: "CLOSED",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
