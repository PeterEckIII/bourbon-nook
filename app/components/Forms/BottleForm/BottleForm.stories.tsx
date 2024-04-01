import type { Meta, StoryObj } from "@storybook/react";

import BottleForm from "./BottleForm";

const meta: Meta<typeof BottleForm> = {
  title: "Components/Forms/BottleForm",
  component: BottleForm,
};

export default meta;

type Story = StoryObj<typeof BottleForm>;

export const Primary: Story = {
  args: {
    inputs: {
      name: {
        id: "name",
        name: "name",
      },
      status: {
        id: "status",
        name: "status",
      },
      type: {
        id: "type",
        name: "type",
      },
      distiller: {
        id: "distiller",
        name: "distiller",
      },
      producer: {
        id: "producer",
        name: "producer",
      },
      country: {
        id: "country",
        name: "country",
      },
      region: {
        id: "region",
        name: "region",
      },
      price: {
        id: "price",
        name: "price",
      },
      age: {
        id: "age",
        name: "age",
      },
      year: {
        id: "year",
        name: "year",
      },
      batch: {
        id: "batch",
        name: "batch",
      },
      barrel: {
        id: "barrel",
        name: "barrel",
      },
      alcoholPercent: {
        id: "alcoholPercent",
        name: "alcoholPercent",
      },
      proof: {
        id: "proof",
        name: "proof",
      },
      size: {
        id: "size",
        name: "size",
      },
      color: {
        id: "color",
        name: "color",
      },
      finishing: {
        id: "finishing",
        name: "finishing",
      },
      imageUrl: {
        id: "imageUrl",
        name: "imageUrl",
      },
      openDate: {
        id: "openDate",
        name: "openDate",
      },
      killDate: {
        id: "killDate",
        name: "killDate",
      },
    },
    navigationState: "idle",
  },
};
