/*
  Warnings:

  - The `status` column on the `bottle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "bottle_status" AS ENUM ('CLOSED', 'OPENED', 'FINISHED');

-- AlterTable
ALTER TABLE "bottle" DROP COLUMN "status",
ADD COLUMN     "status" "bottle_status" NOT NULL DEFAULT 'CLOSED';

-- DropEnum
DROP TYPE "Status";
