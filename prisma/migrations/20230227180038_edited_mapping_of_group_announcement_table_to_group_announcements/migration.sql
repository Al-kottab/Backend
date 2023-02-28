/*
  Warnings:

  - You are about to drop the `groupAnnouncemets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "groupAnnouncemets" DROP CONSTRAINT "groupAnnouncemets_groupId_fkey";

-- DropForeignKey
ALTER TABLE "groupAnnouncemets" DROP CONSTRAINT "groupAnnouncemets_teacherId_fkey";

-- DropTable
DROP TABLE "groupAnnouncemets";

-- CreateTable
CREATE TABLE "groupAnnouncements" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groupAnnouncements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "groupAnnouncements" ADD CONSTRAINT "groupAnnouncements_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupAnnouncements" ADD CONSTRAINT "groupAnnouncements_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
