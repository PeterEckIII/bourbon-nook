import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type { comment } from "~/models/comment.server";
import { update } from "~/models/comment.server";
import { requireUserId } from "~/session.server";
import { assertNonNullable } from "~/utils/helpers.server";

type ActionData = {
  updatedComment?: { body: comment["body"] };
  errors?: {
    body?: string;
    userId?: string;
  };
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  assertNonNullable(userId);

  const formData = await request.formData();
  const body = await formData.get("body")?.toString();
  const commentId = await formData.get("commentId")?.toString();
  assertNonNullable(commentId);

  assertNonNullable(body);
  if (body === "") {
    return;
  }

  try {
    const updatedComment = await update(userId, body, commentId);
    return json<ActionData>(
      { updatedComment },
      { status: 200, statusText: "Successfully updated comment" }
    );
  } catch (error) {
    return json<ActionData>(
      {
        errors: {
          body: `There was an error updating your comment: ${error}`,
        },
      },
      {
        status: 400,
        statusText: `There was an error updating your comment: ${error}`,
      }
    );
  }
};
