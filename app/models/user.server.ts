import type { password, user, review } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "../db.server";

export type { user } from "@prisma/client";

export async function getUserById(id: user["id"]) {
  const user = await prisma.user.findUnique({ where: { id: id } });
  return user;
}

export async function getUserByEmail(email: user["email"]) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

export async function getUserByUsername(username: user["username"]) {
  const user = await prisma.user.findUnique({ where: { username: username! } });
  return user;
}

export async function getUserByReviewId(reviewId: review["id"]) {
  const userObject = await prisma.review.findFirst({
    where: { id: reviewId },
    select: {
      userId: true,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      id: userObject?.userId,
    },
  });

  return user;
}

export async function createUser(
  email: user["email"],
  username: user["username"],
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      username,
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

export async function verifyWithUsername(
  username: user["username"],
  password: password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { username },
    include: { password: true },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );
  if (!isValid) return null;

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  console.log(_password.userId);

  return userWithoutPassword;
}

export async function verifyLogin(
  email: user["email"],
  password: password["hash"],
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
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;
  console.log(_password.userId);

  return userWithoutPassword;
}

export async function follow(
  followerId: user["id"],
  beingFollowedId: user["id"],
) {
  // const follow = await prisma.follows.create({
  //   data: {
  //     followerId,
  //     followingId: beingFollowedId,
  //   },
  // });
  return prisma.user.update({
    where: { id: followerId },
    data: {
      following: {
        connect: {
          followerId_followingId: {
            followerId,
            followingId: beingFollowedId,
          },
        },
      },
    },
  });
}

export function unfollow(followerId: user["id"], beingFollowedId: user["id"]) {
  return prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId: beingFollowedId,
      },
    },
  });
}
