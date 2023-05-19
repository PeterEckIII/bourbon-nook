import { unstable_createRemixStub as createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "components/UI/TextInput",
  component: TextInput,
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/",
          element: <Story />,
        },
      ]);
      return <RemixStub />;
    },
  ],
  tags: ["autodocs"],
  args: {
    name: "email",
    labelName: "Email",
    type: "email",
    emoji: "📧",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Error: Story = {
  args: {
    name: "email",
    labelName: "Email",
    type: "email",
    error:
      "That email is already taken. Please choose another or browse to the login page.",
  },
};
