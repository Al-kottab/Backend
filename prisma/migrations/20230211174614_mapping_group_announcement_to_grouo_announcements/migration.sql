/*
  Warnings:

  - You are about to drop the `GroupAnnouncement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupAnnouncement" DROP CONSTRAINT "GroupAnnouncement_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupAnnouncement" DROP CONSTRAINT "GroupAnnouncement_userId_fkey";

-- DropTable
DROP TABLE "GroupAnnouncement";

-- CreateTable
CREATE TABLE "groupAnnouncemets" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "groupAnnouncemets_pkey" PRIMARY KEY ("groupId","userId")
);

-- AddForeignKey
ALTER TABLE "groupAnnouncemets" ADD CONSTRAINT "groupAnnouncemets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupAnnouncemets" ADD CONSTRAINT "groupAnnouncemets_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
