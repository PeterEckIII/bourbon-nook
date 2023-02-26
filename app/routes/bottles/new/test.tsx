import { useActionData } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";
import { useState } from "react";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name")?.toString();
  console.log(`Name: ${name}`);
  return name;
};

export default function () {
  const name = useActionData();
  const [value, setValue] = useState<string>("");

  return (
    <form method="post">
      <label htmlFor="name-field">
        Name
        <input
          type="text"
          id="name-field"
          name="name"
          defaultValue={value ? undefined : "Peter"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
