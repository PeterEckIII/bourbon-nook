import { unstable_createRemixStub as createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "components/Form/RegisterForm",
  component: RegisterForm,
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([{ path: "/", element: <Story /> }]);
      return <RemixStub />;
    },
  ],
  tags: ["autodocs"],
  args: {
    email: {
      id: "email",
      name: "email",
      errorId: "email-error",
      defaultValue: "jpeckiii@gmail.com",
    },
    username: {
      id: "username",
      name: "username",
      errorId: "username-error",
      defaultValue: "petereck123",
    },
    password: {
      id: "password",
      name: "password",
      errorId: "password-error",
      defaultValue: "password123",
    },
    confirmPassword: {
      id: "email",
      name: "email",
      errorId: "email-error",
      defaultValue: "password123",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <RegisterForm
      email={meta.args?.email!}
      username={meta.args?.username!}
      password={meta.args?.password!}
      confirmPassword={meta.args?.confirmPassword!}
      searchParams={meta.args?.searchParams!}
      form={meta.args?.form!}
    />
  ),
};
