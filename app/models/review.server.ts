import type { user, review, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";
// import { assertNonNullable } from "~/utils/helpers.server";
// import type { ReviewSortOptions } from "~/utils/types";
// import { getBottles } from "./bottle.server";

export type { review } from "@prisma/client";

export const getReview = async ({
  id,
  userId,
}: Pick<review, "id"> & {
  userId: user["id"];
}) => {
  return prisma.review.findFirst({ where: { id, userId } });
};

export async function getReviewsForUser(userId: user["id"]) {
  return await prisma.review.findMany({
    where: { userId },
  });
}

export async function getReviews(userId: user["id"]) {
  return await prisma.review.findMany({
    where: { userId },
    select: {
      date: true,
      id: true,
      overallRating: true,
      value: true,
      bottle: {
        select: {
          id: true,
          name: true,
          status: true,
          type: true,
          distiller: true,
          producer: true,
          proof: true,
          alcoholPercent: true,
          age: true,
          price: true,
          barrel: true,
          batch: true,
          imageUrl: true,
        },
      },
    },
  });
}

export async function getReviewById(reviewId: review["id"]) {
  return await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
    },
  });
}

export const searchReviews = async (
  userId: user["id"],
  query: string,
  skip: number,
  take: number,
) => {
  const reviewsMatchingSearchPhrase = await prisma.review.findMany({
    where: {
      userId,
      OR: [
        {
          bottle: {
            name: {
              contains: query,
            },
          },
        },
        {
          bottle: {
            distiller: {
              contains: query,
            },
          },
        },
        {
          bottle: {
            producer: {
              contains: query,
            },
          },
        },
        {
          bottle: {
            type: {
              contains: query,
            },
          },
        },
        {
          bottle: {
            country: {
              contains: query,
            },
          },
        },
        {
          bottle: {
            region: {
              contains: query,
            },
          },
        },
      ],
    },
    skip: skip || 0,
    take: take,
    select: {
      date: true,
      id: true,
      overallRating: true,
      value: true,
      createdAt: true,
      bottle: {
        select: {
          id: true,
          name: true,
          status: true,
          type: true,
          distiller: true,
          producer: true,
          price: true,
          country: true,
          region: true,
          age: true,
          alcoholPercent: true,
          batch: true,
          barrel: true,
          year: true,
          createdAt: true,
        },
      },
    },
  });
  return JSON.parse(JSON.stringify(reviewsMatchingSearchPhrase));
};

export const getTotalReviews = async ({ userId }: { userId: user["id"] }) => {
  const numberOfReviews = await prisma.review.count({
    where: {
      userId,
    },
  });
  return numberOfReviews;
};

// export const filterReviewsForTable = async ({
//   userId,
//   query,
//   skip,
//   take,
//   sort,
//   direction,
// }: {
//   userId: user["id"];
//   query?: string;
//   skip?: number;
//   take?: number;
//   sort?: ReviewSortOptions;
//   direction?: Prisma.SortOrder;
// }) => {
//   assertNonNullable(userId);

//   let sortOptions: Prisma.reviewOrderByWithRelationInput &
//     Prisma.bottleOrderByWithRelationInput = {};
//   if (sort) {
//     if (sort === "name") {
//       sortOptions = { bottle: { name: direction } };
//     }
//     if (sort === "date") {
//       sortOptions = { date: direction };
//     }
//     if (sort === "status") {
//       sortOptions = { bottle: { status: direction } };
//     }
//     if (sort === "type") {
//       sortOptions = { bottle: { type: direction } };
//     }
//     if (sort === "distiller") {
//       sortOptions = { bottle: { distiller: direction } };
//     }
//     if (sort === "producer") {
//       sortOptions = { bottle: { producer: direction } };
//     }
//     if (sort === "country") {
//       sortOptions = { bottle: { country: direction } };
//     }
//     if (sort === "region") {
//       sortOptions = { bottle: { region: direction } };
//     }
//     if (sort === "price") {
//       sortOptions = { bottle: { price: direction } };
//     }
//     if (sort === "overallRating") {
//       sortOptions = { overallRating: direction };
//     }
//     if (sort === "value") {
//       sortOptions = { value: direction };
//     }
//   }

//   const reviews = await prisma.review.findMany({
//     where: {
//       userId,
//       bottle: {
//         OR: [
//           {
//             name: {
//               contains: query,
//             },
//           },
//           {
//             distiller: {
//               contains: query,
//             },
//           },
//           {
//             producer: {
//               contains: query,
//             },
//           },
//           {
//             type: {
//               contains: query,
//             },
//           },
//           {
//             country: {
//               contains: query,
//             },
//           },
//           {
//             region: {
//               contains: query,
//             },
//           },
//         ],
//       },
//     },
//     skip: skip || undefined,
//     take: take,
//     orderBy: sortOptions,
//     select: {
//       date: true,
//       id: true,
//       overallRating: true,
//       value: true,
//       bottle: {
//         select: {
//           name: true,
//           status: true,
//           type: true,
//           distiller: true,
//           producer: true,
//           proof: true,
//           alcoholPercent: true,
//           age: true,
//           price: true,
//           barrel: true,
//           batch: true,
//           imageUrl: true,
//         },
//       },
//     },
//   });
//   return reviews;
// };

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
}: Omit<review, "createdAt" | "updatedAt"> & { userId: user["id"] }) => {
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

export const editReview = async (
  review: Omit<review, "updatedAt" | "createdAt">,
  userId: user["id"],
) => {
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

// EXPERIMENTATION
const { isHighlyRated, byAuthor, hasRecentComments } = {
  isHighlyRated: () => ({
    overallRating: { gt: 7.5 },
  }),
  byAuthor: (userId: string) => ({
    userId,
  }),
  hasRecentComments: (date: Date) => ({
    comments: {
      some: {
        createdAt: { gte: date },
      },
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<string, (...args: any) => Prisma.reviewWhereInput>;

export const getSpecificComments = async (userId: user["id"]) => {
  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);
  const reviews = prisma.review.findMany({
    where: {
      AND: [
        isHighlyRated(),
        byAuthor(userId),
        hasRecentComments(new Date(yesterday)),
      ],
    },
  });
  return reviews;
};
