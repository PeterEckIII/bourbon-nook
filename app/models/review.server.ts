import type { user, review } from "@prisma/client";
import { prisma } from "~/db.server";

export type { review } from "@prisma/client";

export const getReview = async ({
  id,
  userId,
}: Pick<review, "id"> & {
  userId: user["id"];
}) => {
  return prisma.review.findFirst({ where: { id, userId } });
};

export async function getReviewById(reviewId: review["id"]) {
  return await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
    },
  });
}

export const getReviewListItems = async ({
  userId,
}: {
  userId: user["id"];
}) => {
  const reviews = prisma.review.findMany({
    select: { id: true, bottle: true },
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return reviews;
};

export const getReviewsForTable = async ({
  userId,
}: {
  userId: user["id"];
}) => {
  const reviews = await prisma.review.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
      id: true,
      imageUrl: true,
      overallRating: true,
      value: true,
      bottle: {
        select: {
          name: true,
          type: true,
          distiller: true,
          producer: true,
          proof: true,
          alcoholPercent: true,
          age: true,
          price: true,
        },
      },
    },
  });

  return reviews;
};

export const createReview = async ({
  bottleId,
  date,
  imageUrl,
  setting,
  glassware,
  restTime,
  nose,
  palate,
  finish,
  thoughts,
  cherry,
  strawberry,
  raspberry,
  blackberry,
  blueberry,
  apple,
  banana,
  grape,
  stone,
  citrus,
  tropical,
  pepper,
  bakingSpice,
  cinnamon,
  herbal,
  mint,
  coffee,
  tobacco,
  leather,
  oak,
  toasted,
  smokey,
  peanut,
  almond,
  pecan,
  walnut,
  oily,
  floral,
  corn,
  rye,
  wheat,
  malt,
  dough,
  vanilla,
  caramel,
  molasses,
  butterscotch,
  honey,
  chocolate,
  toffee,
  sugar,
  overallRating,
  value,
  userId,
}: review & { userId: user["id"] }) => {
  return await prisma.review.create({
    data: {
      bottleId,
      date,
      imageUrl,
      setting,
      glassware,
      restTime,
      nose,
      palate,
      finish,
      thoughts,
      cherry,
      strawberry,
      raspberry,
      blackberry,
      blueberry,
      apple,
      banana,
      grape,
      stone,
      citrus,
      tropical,
      pepper,
      bakingSpice,
      cinnamon,
      herbal,
      mint,
      coffee,
      tobacco,
      leather,
      oak,
      toasted,
      smokey,
      peanut,
      almond,
      pecan,
      walnut,
      oily,
      floral,
      corn,
      rye,
      wheat,
      malt,
      dough,
      vanilla,
      caramel,
      molasses,
      butterscotch,
      honey,
      chocolate,
      toffee,
      sugar,
      overallRating,
      value,
      userId,
    },
  });
};

export const editReview = async (review: review, userId: user["id"]) => {
  if (userId !== review.userId) {
    throw new Error(`You are not authorized to edit this review`);
  }
  return await prisma.review.update({
    where: { id: review.id },
    data: {
      ...review,
    },
  });
};

export const deleteReview = async ({
  id,
  userId,
}: Pick<review, "id"> & { userId: user["id"] }) => {
  return prisma.review.deleteMany({
    where: { id, userId },
  });
};
