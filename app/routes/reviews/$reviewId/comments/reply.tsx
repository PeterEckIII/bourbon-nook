import type { ActionArgs } from "@remix-run/server-runtime";
import { reply } from "~/models/comment.server";
import { assertNonNullable } from "~/utils/helpers.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const body = await formData.get("body")?.toString();
  const parentId = await formData.get("parentId")?.toString();
  const userId = await formData.get("userId")?.toString();
  const reviewId = await formData.get("reviewId")?.toString();
  assertNonNullable(userId);
  assertNonNullable(body);
  assertNonNullable(reviewId);
  assertNonNullable(parentId);

  try {
    return await reply(userId, body, reviewId, parentId);
  } catch (error) {
    throw new Error(`Error replying to post ${error}`);
  }
};
