import type { Bottle } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Bottle };

export const getBottle = async (id: Bottle["id"]) => {
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

export const createBottle = async ({
  name,
  type,
  distiller,
  bottler,
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
}: Bottle) => {
  return await prisma.bottle.create({
    data: {
      name,
      type,
      distiller,
      bottler,
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
    },
  });
};

export const editBottle = async (bottle: Bottle) => {
  return await prisma.bottle.update({
    where: {
      id: bottle.id,
    },
    data: {
      ...bottle,
    },
  });
};

export const deleteBottle = async ({ id }: Pick<Bottle, "id">) => {
  return prisma.bottle.deleteMany({
    where: { id },
  });
};
