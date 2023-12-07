import type { user } from "@prisma/client";

import { prisma } from "../db.server";

export async function createFollow(
  followerId: user["id"],
  beingFollowedId: user["id"],
) {
  return prisma.follows.create({
    data: {
      followerId,
      followingId: beingFollowedId,
    },
  });
}

export async function unfollow(
  followerId: user["id"],
  beingFollowedId: user["id"],
) {
  return prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId: beingFollowedId,
      },
    },
  });
}

export async function getFollowing(userId: user["id"]) {
  return prisma.user.findFirstOrThrow({
    where: { id: userId },
    select: {
      following: true,
    },
  });
}

export async function getFollowers(userId: user["id"]) {
  return prisma.user.findFirstOrThrow({
    where: { id: userId },
    select: {
      followers: true,
    },
  });
}
