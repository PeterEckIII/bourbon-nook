import { type bottle, type review, type user } from '~/generated/prisma';
import type { reviewUpdateInput } from '~/generated/prisma/models';
import prisma from '~/lib/prisma';

export async function getReviewsForUser(userId: user['id']) {
  const reviews = await prisma.review.findMany({
    where: { userId },
    include: {
      user: true,
      bottle: true,
    },
  });
  return reviews;
}

export async function getReview(userId: user['id'], reviewId: review['id']) {
  const review = await prisma.review.findUnique({
    where: { userId, id: reviewId },
    include: {
      bottle: true,
    },
  });

  return review;
}

export async function getFilteredReviews(userId: user['id'], query: string) {
  const reviews = await prisma.review.findMany({
    where: {
      userId,
      OR: [
        {
          bottle: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
            distiller: {
              contains: query,
              mode: 'insensitive',
            },
            producer: {
              contains: query,
              mode: 'insensitive',
            },
            country: {
              contains: query,
              mode: 'insensitive',
            },
            region: {
              contains: query,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      bottle: true,
    },
  });
  return reviews;
}

export async function createReview({
  bottleId,
  userId,
  date,
  setting,
  glassware,
  restTime,
  nose,
  palate,
  finish,
  thoughts,
  value,
  overallRating,
}: {
  userId: user['id'];
  bottleId: review['bottleId'];
  date: review['date'];
  setting: review['setting'];
  glassware: review['glassware'];
  restTime: review['restTime'];
  nose: review['nose'];
  palate: review['palate'];
  finish: review['finish'];
  thoughts: review['thoughts'];
  value: review['value'];
  overallRating: review['overallRating'];
}) {
  const newReview = await prisma.review.create({
    data: {
      userId,
      bottleId,
      date,
      setting,
      glassware,
      restTime,
      nose,
      palate,
      finish,
      thoughts,
      value,
      overallRating,
    },
  });
  return newReview;
}

export async function editReview(
  reviewId: review['id'],
  review: reviewUpdateInput
) {
  const editedReview = await prisma.review.update({
    where: { id: reviewId },
    data: review,
  });
  return editedReview;
}

export async function deleteReview(reviewId: review['id']) {
  return await prisma.bottle.delete({
    where: { id: reviewId },
  });
}
