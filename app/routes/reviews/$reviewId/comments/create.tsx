import type { ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type { comment } from "~/models/comment.server";
import { createComment } from "~/models/comment.server";
import { requireUserId } from "~/session.server";
import { assertNonNullable } from "~/utils/helpers.server";

export type CreateCommentData = {
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
    return json<CreateCommentData>({
      errors: {
        body: `Please add a comment body before submitting`,
      },
    });
  }

  try {
    const newComment = (await createComment(
      userId,
      body,
      reviewId
    )) as unknown as comment;

    return json<CreateCommentData>(
      { newComment },
      { status: 200, statusText: "Successfully created comment" }
    );
  } catch (error) {
    return json<CreateCommentData>(
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
