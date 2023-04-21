/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `band` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address";
ALTER TABLE "User" DROP COLUMN "band";
ALTER TABLE "User" DROP COLUMN "city";
ALTER TABLE "User" DROP COLUMN "password_hash";
ALTER TABLE "User" DROP COLUMN "phoneNumber";
ALTER TABLE "User" DROP COLUMN "postal";
ALTER TABLE "User" DROP COLUMN "province";
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
