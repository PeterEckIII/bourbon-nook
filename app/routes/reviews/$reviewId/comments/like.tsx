import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { toggleCommentLike } from "~/models/comment.server";
import { requireUserId } from "~/session.server";
import { assertNonNullable } from "~/utils/helpers.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  assertNonNullable(userId);

  const formData = await request.formData();
  const commentId = formData.get("commentId")?.toString();
  assertNonNullable(commentId);

  try {
    await toggleCommentLike(commentId, userId);
    return json({ success: true });
  } catch (error) {
    return json({ success: false });
  }
};
