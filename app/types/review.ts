import { bottle, review } from "@prisma/client";

export type ReviewPageBottle = Omit<
  bottle,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type ReviewPageReview = Omit<
  review,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
