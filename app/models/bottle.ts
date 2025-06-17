import type { bottle, Prisma, user } from '~/generated/prisma';
import prisma from '~/lib/prisma';

export async function getBottlesForUser(userId: user['id']) {
  const bottles = await prisma.bottle.findMany({
    where: { userId },
    include: {
      user: true,
    },
  });
  return bottles;
}

export async function getBottle(bottleId: bottle['id']) {
  const bottle = await prisma.bottle.findUniqueOrThrow({
    where: { id: bottleId },
  });
  return bottle;
}

export async function createBottle({
  userId,
  name,
  type,
  status,
  distiller,
  producer,
  country,
  region,
  price,
  age,
  proof,
  year,
  barrel,
  finishing,
  imageUrl,
  openDate,
  killDate,
}: {
  userId: user['id'];
  name: bottle['name'];
  type: bottle['type'];
  status: bottle['status'];
  distiller: bottle['distiller'];
  producer: bottle['producer'];
  country: bottle['country'];
  region: bottle['region'];
  price: bottle['price'];
  age: bottle['age'];
  proof: bottle['proof'];
  year: bottle['year'];
  barrel: bottle['barrel'];
  finishing: bottle['finishing'];
  imageUrl: bottle['imageUrl'];
  openDate: bottle['openDate'];
  killDate: bottle['killDate'];
}) {
  const newBottle = await prisma.bottle.create({
    data: {
      userId,
      name,
      type,
      status,
      distiller,
      producer,
      country,
      region,
      price,
      age,
      proof,
      year,
      barrel,
      finishing,
      imageUrl,
      openDate,
      killDate,
    },
  });
  return newBottle;
}

export async function updateImage(
  imageUrl: bottle['imageUrl'],
  userId: user['id'],
  bottleId: bottle['id']
) {
  const updatedBottle = await prisma.bottle.update({
    where: { userId, id: bottleId },
    data: {
      imageUrl,
    },
  });
  return updatedBottle;
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

export async function deleteBottle(bottleId: bottle['id']) {
  return await prisma.bottle.delete({
    where: { id: bottleId },
  });
}
