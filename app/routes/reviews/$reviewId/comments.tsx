import type { comment, review, user } from "@prisma/client";
import { useLoaderData, useFetcher, useActionData } from "@remix-run/react";
import type { LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import CommentSection from "~/components/Comments/CommentSection";
import Button from "~/components/UI/Button";
import { createComment, getComments } from "~/models/comment.server";
import { getUserByReviewId } from "~/models/user.server";
import { getUser, requireUserId } from "~/session.server";
import { assertNonNullable } from "~/utils/helpers.server";

export type PartialComment = {
  body: string;
  id: string;
  createdAt: string;
  author: {
    email: string;
  };
};

type LoaderData = {
  reviewId: review["id"];
  author: user;
  user: user;
  comments: PartialComment[];
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const reviewId = await params.reviewId;
  assertNonNullable(reviewId);

  const author = await getUserByReviewId(reviewId);
  assertNonNullable(author);

  const user = await getUser(request);
  assertNonNullable(user);

  const comments = (await getComments(reviewId)) as unknown as PartialComment[];
  assertNonNullable(comments);

  return json<LoaderData>({
    reviewId,
    author,
    user,
    comments: comments || [],
  });
};

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
      { status: 200, statusText: "Successfully loaded comments" }
    );
  } catch (error) {
    return json<ActionData>(
      { errors: { body: "Body is invalid" } },
      { status: 400, statusText: "Body is invalid" }
    );
  }
};

export default function ReviewCommentsRoute() {
  const loaderData = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const comment = useFetcher();
  console.log(`Loader Data: ${JSON.stringify(loaderData, null, 2)}`);

  return (
    <div>
      <div>
        <comment.Form method="post">
          <div className="mx-2">
            <label className="my-2 flex w-full flex-col gap-1" htmlFor="body">
              Add Comment
            </label>
            <textarea
              aria-label="comment"
              name="body"
              id="body"
              rows={3}
              className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {actionData?.errors?.body && (
            <div className="pt-1 text-red-700" id="email-error">
              {actionData.errors.body}
            </div>
          )}
          <Button callToAction="Submit" type="submit" />
        </comment.Form>
      </div>
      {loaderData.comments.length < 1 ? (
        <div>No comments. Be the first to comment!</div>
      ) : (
        <CommentSection comments={loaderData?.comments} />
      )}
    </div>
  );
}
