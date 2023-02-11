/*
  Warnings:

  - The primary key for the `groupAnnouncemets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "groupAnnouncemets" DROP CONSTRAINT "groupAnnouncemets_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "groupAnnouncemets_pkey" PRIMARY KEY ("id");
