import { useFetcher } from "@remix-run/react";
import ChevronUp from "~/components/Icons/ChevronUp";
import ChevronDown from "~/components/Icons/ChevronDown";
import type { comment } from "@prisma/client";

export type LikeFormProps = {
  commentId: comment["id"];
};

export default function LikeForm({ commentId }: LikeFormProps) {
  const like = useFetcher();
  // TODO: Add "alreadyLiked" boolean to track disabled button status
  // Upvote disabled = alreadyLiked === true
  // Downvote disabled = alreadyLiked === false
  return (
    <>
      <like.Form method="post" action="/reviews/like">
        <input type="hidden" value={commentId} name="commentId" />
        <div className="inline rounded-2xl border-gray-700">
          <button
            name="intent"
            value="comment_upvote"
            className="mr-2 block h-1/2 w-full border-0 p-0 text-xs"
          >
            <span aria-hidden="true">
              <ChevronUp className="" />
            </span>
            <span className="sr-only">Vote up</span>
          </button>
          <button
            name="intent"
            value="comment_downvote"
            className="mr-2 block h-1/2 w-full border-0 p-0 text-xs"
          >
            <span aria-hidden="true">
              <ChevronDown />
            </span>
            <span className="sr-only">Vote down</span>
          </button>
        </div>
      </like.Form>
    </>
  );
}
