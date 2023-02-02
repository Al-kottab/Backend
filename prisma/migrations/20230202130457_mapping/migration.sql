/*
  Warnings:

  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupAppointement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentBadge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "GroupAppointement" DROP CONSTRAINT "GroupAppointement_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupStudent" DROP CONSTRAINT "GroupStudent_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupStudent" DROP CONSTRAINT "GroupStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationTeacher" DROP CONSTRAINT "OrganizationTeacher_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationTeacher" DROP CONSTRAINT "OrganizationTeacher_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentBadge" DROP CONSTRAINT "StudentBadge_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "StudentBadge" DROP CONSTRAINT "StudentBadge_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_id_fkey";

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "GroupAppointement";

-- DropTable
DROP TABLE "GroupStudent";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "OrganizationTeacher";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "StudentBadge";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordHash" TEXT NOT NULL,
    "phone" TEXT,
    "creditCard" TEXT,
    "photo" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentBadges" (
    "studentId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL,

    CONSTRAINT "studentBadges_pkey" PRIMARY KEY ("studentId","badgeId")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherId" INTEGER NOT NULL,
    "organizationId" INTEGER,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizaitonTeachers" (
    "organizationId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,

    CONSTRAINT "organizaitonTeachers_pkey" PRIMARY KEY ("organizationId","teacherId")
);

-- CreateTable
CREATE TABLE "groupStudents" (
    "studentId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "groupStudents_pkey" PRIMARY KEY ("groupId","studentId")
);

-- CreateTable
CREATE TABLE "groupAppointments" (
    "groupId" INTEGER NOT NULL,
    "day" "Day" NOT NULL,
    "time" CHAR(5) NOT NULL,

    CONSTRAINT "groupAppointments_pkey" PRIMARY KEY ("groupId","day")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_id_key" ON "students"("id");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_id_key" ON "teachers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentBadges" ADD CONSTRAINT "studentBadges_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentBadges" ADD CONSTRAINT "studentBadges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizaitonTeachers" ADD CONSTRAINT "organizaitonTeachers_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizaitonTeachers" ADD CONSTRAINT "organizaitonTeachers_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupStudents" ADD CONSTRAINT "groupStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupStudents" ADD CONSTRAINT "groupStudents_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupAppointments" ADD CONSTRAINT "groupAppointments_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
