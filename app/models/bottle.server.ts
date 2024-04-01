import { type bottle, type user } from "@prisma/client";

import { prisma } from "~/db.server";
// import { assertNonNullable } from "~/utils/helpers.server";
// import type { BottleSortOptions } from "~/utils/types";

export type { bottle };

export const getBottles = async (userId: bottle["userId"]) => {
  return prisma.bottle.findMany({ where: { userId } });
};

export const getBottle = async (id: bottle["id"]) => {
  return prisma.bottle.findUnique({ where: { id } });
};

export const getBottlesForTable = async (userId: user["id"]) => {
  const bottles = await prisma.bottle.findMany({
    where: { userId },
    include: {
      reviews: {
        select: {
          id: true,
        },
      },
    },
  });
  return bottles;
};

export const searchBottles = async (
  userId: user["id"],
  query: string,
  skip: number,
  take: number,
) => {
  const bottlesMatchingSearchPhrase = await prisma.bottle.findMany({
    where: {
      userId,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          type: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          distiller: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          producer: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          country: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          region: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          year: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    skip: skip || 0,
    take: take,
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
  });

  return JSON.parse(JSON.stringify(bottlesMatchingSearchPhrase));
};

export const getTotalBottles = async ({ userId }: { userId: user["id"] }) => {
  const numberOfBottles = await prisma.bottle.count({
    where: {
      userId,
    },
  });
  return numberOfBottles;
};

export const filterBottlesForTable = async ({
  userId,
  query,
  skip,
  take, // direction,
} // sort,
: {
  userId: user["id"];
  query?: string;
  skip?: number;
  take?: number;
  // sort?: BottleSortOptions;
  // direction?: Prisma.SortOrder;
}) => {
  // let sortOptions: Prisma.bottleOrderByWithRelationInput = {};
  // if (sort) {
  //   if (sort === "name") {
  //     sortOptions = { name: direction };
  //   }
  //   if (sort === "status") {
  //     sortOptions = { status: direction };
  //   }
  //   if (sort === "type") {
  //     sortOptions = { type: direction };
  //   }
  //   if (sort === "distiller") {
  //     sortOptions = { distiller: direction };
  //   }
  //   if (sort === "producer") {
  //     sortOptions = { producer: direction };
  //   }
  //   if (sort === "country") {
  //     sortOptions = { country: direction };
  //   }
  //   if (sort === "region") {
  //     sortOptions = { region: direction };
  //   }
  //   if (sort === "price") {
  //     sortOptions = { price: direction };
  //   }
  //   if (sort === "proof") {
  //     sortOptions = { proof: direction };
  //   }
  //   if (sort === "alcoholPercent") {
  //     sortOptions = { alcoholPercent: direction };
  //   }
  // }

  const bottles = await prisma.bottle.findMany({
    where: {
      userId,
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
    // orderBy: sortOptions,
    skip: skip || undefined,
    take: take,
    select: {
      id: true,
      name: true,
      status: true,
      type: true,
      distiller: true,
      price: true,
      country: true,
      region: true,
      age: true,
      alcoholPercent: true,
      batch: true,
      barrel: true,
    },
  });
  return bottles;
};

export const getBottlesForCombobox = async (userId: string, query: string) => {
  return prisma.bottle.findMany({
    where: {
      userId,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 4,
    select: {
      id: true,
      name: true,
      status: true,
      type: true,
      distiller: true,
      producer: true,
      country: true,
      region: true,
      price: true,
      age: true,
      year: true,
      batch: true,
      alcoholPercent: true,
      proof: true,
      size: true,
      color: true,
      finishing: true,
      imageUrl: true,
    },
  });
};

export const createBottle = async ({
  userId,
  status,
  name,
  type,
  distiller,
  producer,
  country,
  region,
  price,
  age,
  year,
  batch,
  barrel,
  alcoholPercent,
  proof,
  size,
  color,
  finishing,
  imageUrl,
}: Omit<bottle, "createdAt" | "updatedAt" | "id">) => {
  return prisma.bottle.create({
    data: {
      userId,
      status,
      name,
      type,
      distiller,
      producer,
      country,
      region,
      price,
      age,
      year,
      batch,
      barrel,
      alcoholPercent,
      proof,
      size,
      color,
      finishing,
      imageUrl,
    },
  });
};

export const editBottle = async (
  bottle: Omit<bottle, "createdAt" | "updatedAt">,
) => {
  return prisma.bottle.update({
    where: {
      id: bottle.id,
    },
    data: {
      ...bottle,
    },
  });
};

export const deleteBottle = async ({ id }: { id: string }) => {
  return prisma.bottle.deleteMany({
    where: { id },
  });
};
