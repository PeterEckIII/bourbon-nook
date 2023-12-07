import type { profile, user } from "@prisma/client";

import { prisma } from "~/db.server";
import { assertNonNullable } from "~/utils/helpers.server";

export async function createProfile(userId: user["id"]): Promise<profile> {
  return prisma.profile.create({
    data: {
      userId,
    },
  });
}

export async function getProfileByUserId(
  userId: user["id"],
): Promise<profile | null> {
  assertNonNullable(userId);
  return prisma.profile.findUnique({
    where: {
      userId,
    },
  });
}

export async function getProfileById(
  id: profile["id"],
): Promise<profile | null> {
  return prisma.profile.findUnique({
    where: { id },
  });
}
