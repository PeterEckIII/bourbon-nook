/*
  Warnings:

  - You are about to drop the `Bottle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Password` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bottleId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropTable
DROP TABLE "Bottle";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Follows";

-- DropTable
DROP TABLE "Password";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "bottleId" TEXT,
    "date" TEXT,
    "imageUrl" TEXT,
    "setting" TEXT,
    "glassware" TEXT,
    "restTime" TEXT,
    "nose" TEXT,
    "palate" TEXT,
    "finish" TEXT,
    "thoughts" TEXT,
    "pepper" INTEGER,
    "bakingSpice" INTEGER,
    "cinnamon" INTEGER,
    "herbal" INTEGER,
    "mint" INTEGER,
    "cherry" INTEGER,
    "strawberry" INTEGER,
    "raspberry" INTEGER,
    "blackberry" INTEGER,
    "blueberry" INTEGER,
    "apple" INTEGER,
    "banana" INTEGER,
    "grape" INTEGER,
    "stone" INTEGER,
    "citrus" INTEGER,
    "tropical" INTEGER,
    "coffee" INTEGER,
    "tobacco" INTEGER,
    "leather" INTEGER,
    "oak" INTEGER,
    "toasted" INTEGER,
    "smokey" INTEGER,
    "peanut" INTEGER,
    "almond" INTEGER,
    "pecan" INTEGER,
    "walnut" INTEGER,
    "oily" INTEGER,
    "floral" INTEGER,
    "corn" INTEGER,
    "rye" INTEGER,
    "wheat" INTEGER,
    "malt" INTEGER,
    "dough" INTEGER,
    "vanilla" INTEGER,
    "caramel" INTEGER,
    "molasses" INTEGER,
    "butterscotch" INTEGER,
    "honey" INTEGER,
    "chocolate" INTEGER,
    "toffee" INTEGER,
    "sugar" INTEGER,
    "value" DOUBLE PRECISION,
    "overallRating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bottle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "bottler" TEXT,
    "distiller" TEXT,
    "producer" TEXT,
    "country" TEXT,
    "region" TEXT,
    "price" TEXT,
    "age" TEXT,
    "year" TEXT,
    "batch" TEXT,
    "alcoholPercent" TEXT,
    "proof" TEXT,
    "size" TEXT,
    "color" TEXT,
    "finishing" TEXT,

    CONSTRAINT "bottle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_userId_key" ON "password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "password" ADD CONSTRAINT "password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_bottleId_fkey" FOREIGN KEY ("bottleId") REFERENCES "bottle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
