import type { bottle, Prisma, user } from '~/generated/prisma';
import prisma from '~/lib/prisma';

export async function getBottlesForUser(userId: user['id']) {
  const bottles = await prisma.bottle.findMany({
    where: { userId },
  });
  return bottles;
}

export async function getBottle(bottleId: bottle['id']) {
  const bottle = await prisma.bottle.findUniqueOrThrow({
    where: { id: bottleId },
  });
  return bottle;
}

export async function createBottle(bottle: Prisma.bottleCreateInput) {
  const newBottle = await prisma.bottle.create({ data: bottle });
  return newBottle.id;
}

export async function updateBottle(
  bottleId: bottle['id'],
  userId: user['id'],
  fields: Prisma.$bottlePayload
) {
  const updatedBottle = await prisma.bottle.update({
    where: { userId, id: bottleId },
    data: {
      ...fields.scalars,
    },
  });
  return updatedBottle.id;
}

export async function destroyBottle(
  bottleId: bottle['id'],
  userId: user['id']
) {
  return await prisma.bottle.delete({
    where: { userId, id: bottleId },
  });
}
