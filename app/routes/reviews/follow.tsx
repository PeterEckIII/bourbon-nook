import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { follow } from "~/models/user.server";
import { assertNonNullable } from "~/utils/helpers.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const follower = formData.get("followerId")?.toString();
  const author = formData.get("authorId")?.toString();
  assertNonNullable(follower);
  assertNonNullable(author);

  try {
    await follow(follower, author);
    return json({ ok: true });
  } catch (error) {
    assertNonNullable(error);
    return json({ error });
  }
}
