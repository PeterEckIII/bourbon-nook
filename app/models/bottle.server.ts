import { assertNonNullable } from "~/utils/helpers.server";
import type { bottle, Prisma, user } from "@prisma/client";
import type { BottleSortOptions } from "~/utils/types";
import { prisma } from "~/db.server";

export type { bottle };

export const getBottle = async (id: bottle["id"]) => {
  return prisma.bottle.findUnique({ where: { id } });
};

export const filterBottlesForTable = async ({
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
  sort?: BottleSortOptions;
  direction?: Prisma.SortOrder;
}) => {
  assertNonNullable(userId);

  let sortOptions: Prisma.bottleOrderByWithRelationInput = {};
  if (sort) {
    if (sort === "name") {
      sortOptions = { name: direction };
    }
    if (sort === "status") {
      sortOptions = { status: direction };
    }
    if (sort === "type") {
      sortOptions = { type: direction };
    }
    if (sort === "distiller") {
      sortOptions = { distiller: direction };
    }
    if (sort === "producer") {
      sortOptions = { producer: direction };
    }
    if (sort === "country") {
      sortOptions = { country: direction };
    }
    if (sort === "region") {
      sortOptions = { region: direction };
    }
    if (sort === "price") {
      sortOptions = { price: direction };
    }
    if (sort === "proof") {
      sortOptions = { proof: direction };
    }
    if (sort === "alcoholPercent") {
      sortOptions = { alcoholPercent: direction };
    }
  }

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
    orderBy: sortOptions,
    skip: skip || undefined,
    take: take,
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

export const getTotalBottles = async ({
  userId,
  query,
}: {
  userId: user["id"];
  query?: string;
}) => {
  const numberOfBottles = await prisma.bottle.count({
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
      ],
    },
  });
  return numberOfBottles;
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
  alcoholPercent,
  proof,
  size,
  color,
  finishing,
  imageUrl,
}: bottle) => {
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
      alcoholPercent,
      proof,
      size,
      color,
      finishing,
      imageUrl,
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  });
};

export const editBottle = async (bottle: Omit<bottle, "createdAt">) => {
  return prisma.bottle.update({
    where: {
      id: bottle.id,
    },
    data: {
      ...bottle,
    },
  });
};

export const deleteBottle = async ({ id }: Pick<bottle, "id">) => {
  return prisma.bottle.deleteMany({
    where: { id },
  });
};
