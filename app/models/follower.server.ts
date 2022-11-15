import { prisma } from "../db.server";
import type { follows, user } from "@prisma/client";

export async function createFollow(
  followerId: user["id"],
  beingFollowedId: user["id"]
) {
  return await prisma.follows.create({
    data: {
      followerId,
      followingId: beingFollowedId,
    },
  });
}

export async function unfollow(
  followerId: user["id"],
  beingFollowedId: user["id"]
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
  return await prisma.user.findFirstOrThrow({
    where: { id: userId },
    select: {
      following: true,
    },
  });
}
