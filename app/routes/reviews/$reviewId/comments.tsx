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
import { useTypedLoaderData } from "remix-typedjson";

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

  console.log(
    `Nested Comments: ${JSON.stringify(nestComments(null), null, 2)}`
  );

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
  const commentId = (await formData.get("commentId")?.toString()) ?? null;

  assertNonNullable(intent);
  assertNonNullable(body);
  if (body === "") {
    return;
  }

  // try {
  //   const newComment = (await createComment(
  //     userId,
  //     body,
  //     reviewId
  //   )) as unknown as comment;
  //   return json<ActionData>(
  //     { newComment },
  //     { status: 200, statusText: "Successfully loaded comments" }
  //   );
  // } catch (error) {
  //   return json<ActionData>(
  //     { errors: { body: "Body is invalid" } },
  //     { status: 400, statusText: "Body is invalid" }
  //   );
  // }
};

export default function ReviewCommentsRoute() {
  const loaderData = useTypedLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const comment = useFetcher();
  const commentRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (commentRef.current) {
      if (comment.state === "submitting") {
        commentRef.current.reset();
      }
    }
  }, [comment.state, comment.data]);

  return (
    <div>
      <div>
        <comment.Form
          method="post"
          ref={commentRef}
          action={`/reviews/${loaderData.reviewId}/comments/create`}
        >
          <div className="mx-2">
            <label className="my-2 flex w-full flex-col gap-1" htmlFor="body">
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

          {actionData?.errors?.body && (
            <div className="pt-1 text-red-700" id="email-error">
              {actionData.errors.body}
            </div>
          )}
          <Button callToAction="Submit" type="submit" />
        </comment.Form>
      </div>
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
