-- CreateTable
CREATE TABLE "groupAnnouncemets" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groupAnnouncemets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "groupAnnouncemets" ADD CONSTRAINT "groupAnnouncemets_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupAnnouncemets" ADD CONSTRAINT "groupAnnouncemets_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
