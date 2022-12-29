/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bottle" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "imageUrl";
