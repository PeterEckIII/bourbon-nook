/*
  Warnings:

  - You are about to drop the column `bottler` on the `bottle` table. All the data in the column will be lost.
  - Added the required column `status` to the `bottle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `bottle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CLOSED', 'OPENED', 'FINISHED');

-- AlterTable
ALTER TABLE "bottle" DROP COLUMN "bottler",
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bottle" ADD CONSTRAINT "bottle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
