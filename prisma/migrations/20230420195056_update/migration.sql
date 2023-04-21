/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[date]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passed` to the `UserCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "date" TIMESTAMP(3);
ALTER TABLE "Course" ALTER COLUMN "isOnline" SET DEFAULT false;

-- AlterTable
ALTER TABLE "UserCourse" ADD COLUMN     "passed" BOOL NOT NULL;

-- DropTable
DROP TABLE "Schedule";

-- CreateIndex
CREATE UNIQUE INDEX "Course_date_key" ON "Course"("date");
