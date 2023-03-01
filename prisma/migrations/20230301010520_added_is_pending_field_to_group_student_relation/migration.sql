/*
  Warnings:

  - Added the required column `isPending` to the `groupStudents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groupStudents" ADD COLUMN     "isPending" BOOLEAN NOT NULL;
