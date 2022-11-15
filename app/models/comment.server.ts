import type { review } from "@prisma/client";

import type { user } from "@prisma/client";

import { prisma } from "~/db.server";

export type { comment } from "@prisma/client";

export async function createComment(
  userId: user["id"],
  body: string,
  reviewId: review["id"]
) {
  return prisma.comment.create({
    data: {
      body,
      authorId: userId,
      reviewId,
    },
  });
}

export async function getCommentsForReview(reviewId: review["id"]) {
  return await prisma.comment.findMany({
    where: { reviewId },
  });
}

export async function getCommentsForUser(userId: user["id"]) {
  return await prisma.comment.findMany({
    where: { authorId: userId },
  });
}
