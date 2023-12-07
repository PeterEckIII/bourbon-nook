import type { comment, review, user } from "@prisma/client";

import { prisma } from "~/db.server";
import { assertNonNullable } from "~/utils/helpers.server";

export type { comment } from "@prisma/client";

export function createComment(
  userId: user["id"],
  body: string,
  reviewId: review["id"],
) {
  return prisma.comment
    .create({
      data: {
        userId,
        body,
        reviewId,
        parentId: null,
      },
    })
    .then((comment) => {
      return {
        ...comment,
        likeCount: 0,
        likedByMe: false,
      };
    });
}

export async function update(
  userId: user["id"],
  body: comment["body"],
  commentId: comment["id"],
) {
  const commentFromDb = await prisma.comment.findFirst({
    where: { id: commentId },
  });
  if (commentFromDb?.userId === userId) {
    return prisma.comment.update({
      where: { id: commentId },
      data: {
        body,
      },
      select: { body: true },
    });
  } else {
    throw new Error(`You are not allowed to edit a comment that you don't own`);
  }
}

export async function deleteComment(
  userId: user["id"],
  commentId: comment["id"],
) {
  const commentToDelete = await prisma.comment.findFirstOrThrow({
    where: { id: commentId },
  });

  if (commentToDelete.userId === userId) {
    return prisma.comment.delete({
      where: { id: commentToDelete.id },
    });
  }
}

export async function reply(
  userId: user["id"],
  body: comment["body"],
  reviewId: review["id"],
  parentId: comment["id"],
): Promise<comment> {
  const parentComment = await prisma.comment.findUnique({
    where: { id: parentId },
  });
  assertNonNullable(parentComment);
  return prisma.comment.create({
    data: {
      userId,
      reviewId: parentComment.reviewId,
      body,
      parentId,
    },
  });
}

export async function getComments(reviewId: review["id"], userId: user["id"]) {
  const comments = await prisma.comment.findMany({
    where: { reviewId },
    select: {
      id: true,
      parentId: true,
      user: true,
      body: true,
      createdAt: true,
      _count: { select: { likes: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const likes = await prisma.like.findMany({
    where: {
      userId,
      commentId: {
        in: comments.map((comment) => comment.id),
      },
    },
  });

  return {
    comments: comments.map((comment) => {
      const { _count, ...rest } = comment;
      return {
        ...rest,
        likedByMe: likes.find((like) => like.commentId === comment.id),
        likeCount: _count.likes,
      };
    }),
  };
}

export async function getNumComments(reviewId: review["id"]) {
  return await prisma.comment.count({
    where: { reviewId },
  });
}

export async function toggleCommentLike(
  commentId: comment["id"],
  userId: user["id"],
) {
  const userComment = {
    commentId,
    userId,
  };

  const like = await prisma.like.findUnique({
    where: { userId_commentId: userComment },
  });

  if (like === null) {
    prisma.like
      .create({
        data: userComment,
      })
      .then(() => {
        return { addLike: true };
      });
  } else {
    prisma.like
      .delete({ where: { userId_commentId: userComment } })
      .then(() => {
        return { addLike: false };
      });
  }
}
