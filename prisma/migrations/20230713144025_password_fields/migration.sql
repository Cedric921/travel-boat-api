/*
  Warnings:

  - Added the required column `password` to the `Custom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Custom" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
