import { prisma } from "~/db.server";

export const cleanup = async () => {
  const deleteUsers = prisma.user.deleteMany();
  const deleteReviews = prisma.review.deleteMany();
  const deleteBottles = prisma.bottle.deleteMany();

  await prisma.$transaction([deleteUsers, deleteReviews, deleteBottles]);

  await prisma.$disconnect();
};
