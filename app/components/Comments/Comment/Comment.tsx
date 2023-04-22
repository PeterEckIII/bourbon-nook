import type { user } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import LikeForm from "~/components/Form/LikeForm";
import EditIcon from "~/components/Icons/EditIcon";
import HeartIcon from "~/components/Icons/HeartIcon";
import ReplyIcon from "~/components/Icons/ReplyIcon";
import TrashIcon from "~/components/Icons/TrashIcon";
import IconButton from "~/components/UI/IconButton";
import { useUser } from "~/utils";
import CommentSection from "../CommentSection";
import Button from "~/components/UI/Button";
import type { Comments } from "~/routes/reviews/$reviewId/comments";
import EmptyHeartIcon from "~/components/Icons/EmptyHeartIcon";

type CommentProps = {
  comment: Comments;
  user: user;
  reviewId: string;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

const userNameFormatter = (email: string) => {
  return email.replace(/@(\w*.(\w*))/, "");
};

export default function Comment({ comment, user, reviewId }: CommentProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [areChildrenHidden, setAreChildrenHidden] = useState<boolean>(false);
  const loadedUser = useUser();
  const childComments = comment.children;

  const edit = useFetcher();
  const editRef = useRef<HTMLFormElement | null>(null);

  const deleteComment = useFetcher();
  const deleteRef = useRef<HTMLFormElement | null>(null);

  const reply = useFetcher();
  const replyRef = useRef<HTMLFormElement | null>(null);

  const like = useFetcher();
  const likeRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (editRef.current) {
      if (edit.state === "submitting") {
        setIsEditing(false);
        editRef.current.reset();
      }
    }
  }, [edit.state]);

  useEffect(() => {
    if (deleteRef.current) {
      if (deleteComment.state === "submitting") {
        deleteRef.current.reset();
      }
    }
  }, [deleteComment.state]);

  useEffect(() => {
    if (replyRef.current) {
      if (reply.state === "submitting") {
        setIsReplying(false);
        replyRef.current.reset();
      }
    }
  }, [reply.state]);

  useEffect(() => {
    if (likeRef.current) {
      if (like.state === "submitting") {
        setIsEditing(false);
        likeRef.current.reset();
      }
    }
  }, [like.state]);

  const deleteHandler = (e: React.ChangeEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("commentId", comment.id);
    deleteComment.submit(formData, {
      method: "post",
      action: `/reviews/${reviewId}/comments/delete`,
    });
  };

  const likeHandler = (e: React.ChangeEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("commentId", comment.id);
    like.submit(formData, {
      method: "post",
      action: `/reviews/${reviewId}/comments/like`,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="comment">
        <div className="header">
          <span className="font-bold">
            {userNameFormatter(comment.user.email)}
          </span>
          <span className="date">
            {dateFormatter.format(Date.parse(String(comment.createdAt)))}
          </span>
        </div>
        {isEditing ? (
          <edit.Form
            method="post"
            ref={editRef}
            action={`/reviews/${reviewId}/comments/edit`}
          >
            <textarea
              aria-label="comment"
              defaultValue={comment.body}
              name="body"
              id="body"
              rows={2}
              className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            <input type="hidden" name="commentId" value={comment.id} />
            <Button callToAction="Update" type="submit" />
          </edit.Form>
        ) : (
          <div className="mx-2 whitespace-pre-wrap">{comment.body}</div>
        )}
        <div className="footer">
          <IconButton
            Icon={comment.likedByMe ? HeartIcon : EmptyHeartIcon}
            aria-label={comment.likedByMe ? "Unlike" : "Like"}
            isActive={false}
            likeHandler={(e: React.ChangeEvent) => likeHandler(e)}
            disabled={like.state === "submitting"}
          >
            {comment.likeCount}
          </IconButton>
          <IconButton
            handler={() => setIsReplying((prev) => !prev)}
            Icon={ReplyIcon}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
            isActive={isReplying}
          />
          {loadedUser.id === comment.user.id ? (
            <>
              <IconButton
                handler={() => setIsEditing((prev) => !prev)}
                Icon={EditIcon}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
                isActive={isEditing}
              />
              <IconButton
                deleteHandler={(e: React.ChangeEvent) => deleteHandler(e)}
                Icon={TrashIcon}
                aria-label="delete"
                isActive={false}
                color="danger"
                disabled={deleteComment.state === "submitting"}
              />
            </>
          ) : null}
        </div>
      </div>
      {isReplying && (
        <div className="ml-2">
          <reply.Form
            ref={replyRef}
            method="post"
            action={`/reviews/${reviewId}/comments/reply`}
          >
            <input type="hidden" name="parentId" value={comment.id} />
            <input type="hidden" name="userId" value={user.id} />
            <input type="hidden" name="reviewId" value={reviewId} />
            <div className="mx-2">
              <label
                className="my-2 flex w-full flex-col gap-1"
                htmlFor="body"
              />
              <textarea
                autoFocus
                aria-label="comment"
                name="body"
                id="body"
                rows={3}
                className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button
              callToAction="Submit"
              className="float-right mr-2"
              type="submit"
            >
              Submit
            </Button>
          </reply.Form>
        </div>
      )}
      {childComments && childComments?.length > 0 ? (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              aria-label="Hide Replies"
              aria-pressed={areChildrenHidden}
              onClick={() => setAreChildrenHidden(true)}
              className="collapse-line"
              disabled={areChildrenHidden}
              aria-disabled={areChildrenHidden}
            />
            <div className="nested-comments">
              <CommentSection
                comments={childComments}
                reviewId={reviewId}
                user={loadedUser}
              />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            aria-label="Collapse comment"
            aria-pressed={!areChildrenHidden}
            disabled={!areChildrenHidden}
            aria-disabled={!areChildrenHidden}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      ) : null}
      {/* <div className="my-2 ml-8 flex flex-col">
          <p>{comment.body}</p>
          <div className="my-2 flex flex-col items-start">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="border-2 bg-gray-100 px-2 hover:bg-gray-300"
            >
              Reply
            </button>

            {isReplying ? (
              
            ) : null}
          </div>
        </div> */}
    </div>
  );
}
