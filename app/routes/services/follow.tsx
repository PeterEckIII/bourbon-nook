import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { follow } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { assertNonNullable } from "~/utils/helpers.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const authorId = formData.get("authorId")?.toString();
  assertNonNullable(authorId);

  try {
    await follow(userId, authorId);
    return json({ ok: true });
  } catch (error) {
    return json({ error });
  }
};
