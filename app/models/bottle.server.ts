import type { bottle, BottleStatus, user } from "@prisma/client";
import { ErrorBase } from "~/utils/ErrorBase";
import { prisma } from "~/db.server";

type ErrorName =
  | "GET_BOTTLE_ERROR"
  | "GET_BOTTLE_LIST_ITEMS_ERROR"
  | "GET_BOTTLES_FOR_USER_ERROR"
  | "GET_BOTTLES_FOR_COMBOBOX_ERROR"
  | "CREATE_BOTTLE_ERROR"
  | "EDIT_BOTTLE_ERROR"
  | "DELETE_BOTTLE_ERROR";

export class BottleError extends ErrorBase<ErrorName> {}

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

export type GridCollection = {
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
  review: {
    id: string | null;
  };
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
