/*
  Warnings:

  - Added the required column `category` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_userId_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "category" TEXT NOT NULL;
