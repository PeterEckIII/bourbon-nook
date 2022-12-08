/*
  Warnings:

  - Made the column `authorId` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "review" ALTER COLUMN "authorId" SET NOT NULL;
