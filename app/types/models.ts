import { user } from "@prisma/client";

export type UserWithDateAsString = Omit<user, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
