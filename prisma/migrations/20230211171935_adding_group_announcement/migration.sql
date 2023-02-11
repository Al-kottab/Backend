-- CreateTable
CREATE TABLE "GroupAnnouncement" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "GroupAnnouncement_pkey" PRIMARY KEY ("groupId","userId")
);

-- AddForeignKey
ALTER TABLE "GroupAnnouncement" ADD CONSTRAINT "GroupAnnouncement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupAnnouncement" ADD CONSTRAINT "GroupAnnouncement_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
