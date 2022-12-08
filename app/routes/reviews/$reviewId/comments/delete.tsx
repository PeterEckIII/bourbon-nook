import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { deleteComment } from "~/models/comment.server";
import type { comment } from "~/models/comment.server";
import { requireUserId } from "~/session.server";
import { assertNonNullable } from "~/utils/helpers.server";

type ActionData = {
  deletedComment?: comment;
  errors?: {
    body?: string;
    userId?: string;
  };
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  assertNonNullable(userId);

  const formData = await request.formData();
  const commentId = await formData.get("commentId")?.toString();
  assertNonNullable(commentId);

  try {
    const deletedComment = await deleteComment(userId, commentId);
    return json<ActionData>(
      { deletedComment },
      { status: 200, statusText: "Successfully deleted comment" }
    );
  } catch (error) {
    return json<ActionData>(
      {
        errors: {
          userId: `There was an error deleting your comment: ${error}`,
        },
      },
      {
        status: 400,
        statusText: `There was an error deleting your comment: ${error}`,
      }
    );
  }
};
