import type { BottleStatus } from "@prisma/client";
import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";
import { useState } from "react";
import RadioInput from "~/components/UI/Inputs/RadioInput";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  console.log(`Payload: ${JSON.stringify(payload, null, 2)}`);

  return null;
};

export default function ReviewTestRoute() {
  return <div></div>;
}
