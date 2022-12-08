/*
  Warnings:

  - You are about to drop the column `authorId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `parentCommentId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the `_userLikedComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_userLikedReviews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_userLikedComments" DROP CONSTRAINT "_userLikedComments_A_fkey";

-- DropForeignKey
ALTER TABLE "_userLikedComments" DROP CONSTRAINT "_userLikedComments_B_fkey";

-- DropForeignKey
ALTER TABLE "_userLikedReviews" DROP CONSTRAINT "_userLikedReviews_A_fkey";

-- DropForeignKey
ALTER TABLE "_userLikedReviews" DROP CONSTRAINT "_userLikedReviews_B_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_parentCommentId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_authorId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "authorId",
DROP COLUMN "parentCommentId",
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_userLikedComments";

-- DropTable
DROP TABLE "_userLikedReviews";

-- CreateTable
CREATE TABLE "like" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("userId","commentId")
);

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
