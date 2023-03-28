import { assertNonNullable } from "~/utils/helpers.server";
import type { bottle, BottleStatus, Prisma, user } from "@prisma/client";
import { prisma } from "~/db.server";
export type { bottle };

export const getBottle = async (id: bottle["id"]) => {
  return prisma.bottle.findUnique({ where: { id } });
};

export const getBottleListItems = async () => {
  return prisma.bottle.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export type GridBottle = {
  id: string;
  status: BottleStatus;
  name: string;
  type: string;
  distiller: string | null;
  producer: string | null;
  country: string | null;
  region: string | null;
  price: string | null;
  age: string | null;
  year: string | null;
  batch: string | null;
  alcoholPercent: string | null;
  proof: string | null;
  size: string | null;
  color: string | null;
  finishing: string | null;
  imageUrl: string | null;
  reviews:
    | {
        id: string | null;
      }[]
    | null;
};

export const sortBottlesForTable = async ({
  userId,
  sortDirection,
  field,
  query,
}: {
  userId: string;
  sortDirection: string;
  field: keyof GridBottle;
  query: string;
}) => {
  return await prisma.bottle.findMany({
    where: {
      userId,
      OR: [
        {
          [field]: {
            contains: query,
          },
        },
      ],
    },
    orderBy: [
      {
        [field]: sortDirection,
      },
    ],
    include: {
      reviews: {
        select: {
          id: true,
        },
      },
    },
  });
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
  sort?: keyof GridBottle;
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

export const getBottlesForGrid = async (
  userId: user["id"],
  from: number,
  to: number
) => {
  const bottles = await prisma.bottle.findMany({
    where: {
      userId,
    },
    skip: from,
    take: to - from,
    select: {
      id: true,
      status: true,
      name: true,
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
      reviews: {
        select: {
          id: true,
        },
      },
    },
  });
  return bottles;
};

export const getBottlesForUser = async (userId: user["id"]) => {
  return prisma.bottle.findMany({
    where: { userId },
    include: {
      reviews: true,
    },
  });
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
    },
  });
};

type EditBottleByIdProps = {
  bottleId: bottle["id"];
  bottle: Omit<bottle, "id">;
};

export const editBottleById = async ({
  bottleId,
  bottle,
}: EditBottleByIdProps) => {
  return prisma.bottle.update({
    where: {
      id: bottleId,
    },
    data: {
      ...bottle,
    },
  });
};

export const editBottle = async (bottle: bottle) => {
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
