import type { comment, review, user } from "@prisma/client";
import { useFetcher, useActionData } from "@remix-run/react";
import type {
  LoaderArgs,
  ActionArgs,
  LinksFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useCallback, useEffect, useRef } from "react";
import CommentSection from "~/components/Comments/CommentSection";
import Button from "~/components/UI/Button";
import iconBtnStyles from "~/components/UI/IconButton/IconButton.css";
import { createComment, getComments, update } from "~/models/comment.server";
import { getUser, requireUserId } from "~/session.server";
import { getUserById } from "~/models/user.server";
import { assertNonNullable } from "~/utils/helpers.server";
import { useTypedFetcher, useTypedLoaderData } from "remix-typedjson";
import { CreateCommentData } from "./comments/create";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: iconBtnStyles,
    },
  ];
};

export type CommentFromDB = {
  id: string;
  user: user;
  parentId: string | null;
  body: string;
  createdAt: Date;
};

export interface Comments extends Record<string, any> {
  id: string;
  user: user;
  parentId: string | null;
  body: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
}

type LoaderData = {
  reviewId: review["id"];
  user: user;
  comments: Comments[];
};

export const loader = async ({ request, params }: LoaderArgs) => {
  // Review
  const reviewId = await params.reviewId;
  assertNonNullable(reviewId);

  // User
  const userId = await getUser(request);
  assertNonNullable(userId);
  const user = await getUserById(userId.id);
  assertNonNullable(user);

  // Comments
  const flatComments = await getComments(reviewId, userId.id);
  const nestComments = (parentId: string | null) => {
    const subComments = flatComments.comments.filter(
      (c) => c.parentId === parentId
    );
    if (subComments.length === 0) {
      return subComments;
    }
    subComments.forEach((c) => {
      // @ts-ignore
      c.children = nestComments(c.id);
    });
    return subComments;
  };

  return json<LoaderData>({
    reviewId,
    user,
    // @ts-ignore
    comments: nestComments(null),
  });
};

type ActionData = {
  newComment?: comment;
  updatedComment?: { body: string };
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
  const intent = formData.get("intent")?.toString();
  const body = await formData.get("body")?.toString();
  const commentId = formData.get("commentId")?.toString();

  assertNonNullable(intent);
  assertNonNullable(body);
  if (body === "") {
    return;
  }
};

export default function ReviewCommentsRoute() {
  const loaderData = useTypedLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const commentFetcher = useTypedFetcher<CreateCommentData>();
  const commentRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (commentRef.current) {
      if (commentFetcher.state === "submitting") {
        commentRef.current.reset();
      }
    }
  }, [commentFetcher.state, commentFetcher.data]);

  return (
    <div
      id="comment-section"
      className="rounded-lg bg-white p-4 shadow-lg shadow-blue-700"
    >
      <div>
        <commentFetcher.Form
          method="post"
          ref={commentRef}
          action={`/reviews/${loaderData.reviewId}/comments/create`}
        >
          <div className="mx-2">
            <label
              className="my-2 flex w-full flex-col gap-1 text-2xl text-blue-700"
              htmlFor="body"
            >
              Add Comment
            </label>
            <textarea
              aria-label="comment"
              name="body"
              id="body"
              rows={2}
              className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <input type="hidden" name="intent" value="create" />
          {commentFetcher.data?.errors?.body && (
            <div className="ml-4 p-1 text-red-500" id="email-error">
              <p className="text-red-500">
                {commentFetcher?.data?.errors?.body}
              </p>
            </div>
          )}
          <div className="float-right">
            <Button primary callToAction="Submit" type="submit" />
          </div>
        </commentFetcher.Form>
      </div>
      <h4 className="mt-8 text-2xl text-blue-700">Comments</h4>
      {loaderData.comments.length < 1 ? (
        <div className="m-2 p-2">No comments. Be the first to comment!</div>
      ) : (
        <CommentSection
          user={loaderData?.user}
          reviewId={loaderData.reviewId}
          comments={loaderData.comments}
        />
      )}
    </div>
  );
}
