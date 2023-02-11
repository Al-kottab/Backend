/*
  Warnings:

  - You are about to drop the column `teacherId` on the `groups` table. All the data in the column will be lost.
  - Added the required column `userId` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_teacherId_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "teacherId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
