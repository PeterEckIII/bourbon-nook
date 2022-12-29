import type { bottle, user } from "@prisma/client";

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

export const getBottlesForUser = async (userId: user["id"]) => {
  return prisma.bottle.findMany({
    where: { userId },
    select: {
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
