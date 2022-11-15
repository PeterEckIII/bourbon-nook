import bcrypt from "bcrypt";
import type { password, user } from "@prisma/client";

import { prisma } from "../db.server";

export type { user } from "@prisma/client";

export async function getUserById(id: user["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: user["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: user["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: user["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: user["email"],
  password: password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function follow(
  followerId: user["id"],
  beingFollowedId: user["id"]
) {
  const follow = await prisma.follows.create({
    data: {
      followerId,
      followingId: beingFollowedId,
    },
  });

  return await prisma.user.update({
    where: { id: followerId },
    data: {
      following: {
        connect: {
          followerId_followingId: follow,
        },
      },
    },
  });
}

export async function unfollow(
  followerId: user["id"],
  beingFollowedId: user["id"]
) {
  await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId: beingFollowedId,
      },
    },
  });
}
