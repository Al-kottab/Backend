/*
  Warnings:

  - The primary key for the `groupStudents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studentId` on the `groupStudents` table. All the data in the column will be lost.
  - Added the required column `userId` to the `groupStudents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groupStudents" DROP CONSTRAINT "groupStudents_studentId_fkey";

-- AlterTable
ALTER TABLE "groupStudents" DROP CONSTRAINT "groupStudents_pkey",
DROP COLUMN "studentId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "groupStudents_pkey" PRIMARY KEY ("groupId", "userId");

-- AddForeignKey
ALTER TABLE "groupStudents" ADD CONSTRAINT "groupStudents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
