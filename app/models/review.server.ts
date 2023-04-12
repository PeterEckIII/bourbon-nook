import { assertNonNullable } from "~/utils/helpers.server";
import type { user, review, Prisma } from "@prisma/client";
import { prisma } from "~/db.server";
import { ErrorBase } from "~/utils/ErrorBase";
import type { GridReview } from "~/routes/services/search/review";
import { ReviewSortOptions } from "~/routes/services/search/review/fetch";

type ErrorName =
  | "GET_REVIEW_ERROR"
  | "GET_REVIEW_BY_ID_ERROR"
  | "GET_REVIEW_LIST_ITEMS_ERROR"
  | "GET_REVIEWS_FOR_TABLE_ERROR"
  | "CREATE_REVIEW_ERROR"
  | "EDIT_REVIEW_ERROR"
  | "DELETE_REVIEW_ERROR";

export class ReviewError extends ErrorBase<ErrorName> {}

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
    where: { userId },
    select: { id: true, bottle: true },
    orderBy: { createdAt: "desc" },
  });
  return reviews;
};

export const getTotalReviews = async ({
  userId,
  query,
}: {
  userId: user["id"];
  query?: string;
}) => {
  const numberOfReviews = await prisma.review.count({
    where: {
      userId,
      bottle: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            distiller: {
              contains: query,
            },
          },
          {
            producer: {
              contains: query,
            },
          },
          {
            type: {
              contains: query,
            },
          },
          {
            country: {
              contains: query,
            },
          },
          {
            region: {
              contains: query,
            },
          },
        ],
      },
    },
  });
  return numberOfReviews;
};

export const filterReviewsForTable = async ({
  userId,
  query,
  skip,
  take,
  sort,
  direction,
}: {
  userId: user["id"];
  query?: string;
  skip?: number;
  take?: number;
  sort?: ReviewSortOptions;
  direction?: Prisma.SortOrder;
}) => {
  assertNonNullable(userId);

  let sortOptions: Prisma.reviewOrderByWithRelationInput = {};
  if (sort) {
    if (sort === "name") {
      sortOptions = { bottle: { name: direction } };
    }
    if (sort === "status") {
      sortOptions = { bottle: { status: direction } };
    }
    if (sort === "type") {
      sortOptions = { bottle: { type: direction } };
    }
    if (sort === "distiller") {
      sortOptions = { bottle: { distiller: direction } };
    }
    if (sort === "producer") {
      sortOptions = { bottle: { producer: direction } };
    }
    if (sort === "country") {
      sortOptions = { bottle: { country: direction } };
    }
    if (sort === "region") {
      sortOptions = { bottle: { region: direction } };
    }
  }

  const reviews = await prisma.review.findMany({
    where: {
      userId,
      bottle: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            distiller: {
              contains: query,
            },
          },
          {
            producer: {
              contains: query,
            },
          },
          {
            type: {
              contains: query,
            },
          },
          {
            country: {
              contains: query,
            },
          },
          {
            region: {
              contains: query,
            },
          },
        ],
      },
    },
    skip: skip || undefined,
    take: take,
    orderBy: sortOptions,
    select: {
      date: true,
      id: true,
      overallRating: true,
      value: true,
      bottle: {
        select: {
          name: true,
          status: true,
          type: true,
          distiller: true,
          producer: true,
          proof: true,
          alcoholPercent: true,
          age: true,
          price: true,
          imageUrl: true,
        },
      },
    },
  });
  return reviews;
};

export const getReviewsForTable = async ({
  userId,
}: {
  userId: user["id"];
}) => {
  assertNonNullable(userId);
  const reviews = await prisma.review.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
      id: true,
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
          imageUrl: true,
        },
      },
    },
  });

  return reviews;
};

export const createReview = async ({
  bottleId,
  date,
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
  return prisma.review.create({
    data: {
      bottleId,
      date,
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
  return prisma.review.update({
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
