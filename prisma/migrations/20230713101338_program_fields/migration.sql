/*
  Warnings:

  - Added the required column `beginTravelTime` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "beginTravelTime" TEXT NOT NULL,
ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
