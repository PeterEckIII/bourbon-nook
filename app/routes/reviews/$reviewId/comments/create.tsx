import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime/dist/router";
import type { comment } from "~/models/comment.server";
import { createComment } from "~/models/comment.server";
import { requireUserId } from "~/session.server";
import { assertNonNullable } from "~/utils/helpers.server";

type ActionData = {
  newComment?: comment;
  errors?: {
    body?: string;
  };
};

export const action = async ({ request, params }: ActionArgs) => {
  const userId = await requireUserId(request);
  assertNonNullable(userId);
  const reviewId = params.reviewId;
  assertNonNullable(reviewId);

  const formData = await request.formData();
  const body = await formData.get("body")?.toString();

  assertNonNullable(body);
  if (body === "") {
    return;
  }

  try {
    const newComment = (await createComment(
      userId,
      body,
      reviewId
    )) as unknown as comment;

    return json<ActionData>(
      { newComment },
      { status: 200, statusText: "Successfully created comment" }
    );
  } catch (error) {
    return json<ActionData>(
      {
        errors: {
          body: `There was an error creating your comment: ${error}`,
        },
      },
      {
        status: 400,
        statusText: `There was an error creating your comment: ${error}`,
      }
    );
  }
};
