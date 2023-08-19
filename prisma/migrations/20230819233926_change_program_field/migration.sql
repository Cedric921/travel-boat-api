/*
  Warnings:

  - You are about to drop the column `beginTravelTime` on the `Program` table. All the data in the column will be lost.
  - Added the required column `typeTravel` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "beginTravelTime",
ADD COLUMN     "typeTravel" TEXT NOT NULL;
