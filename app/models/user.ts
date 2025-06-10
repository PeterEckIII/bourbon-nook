import type { user } from '~/generated/prisma';
import type { userCreateInput } from '~/generated/prisma/models';
import prisma from '~/lib/prisma';

export async function getUserById(userId: user['id']) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}

export async function getUserByUsername(username: user['username']) {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
}

export async function getUsers() {
  const users = await prisma.user.findMany({});
  return users;
}

export async function createUser(user: userCreateInput) {
  const newUser = await prisma.user.create({
    data: { ...user },
  });
  return newUser;
}
