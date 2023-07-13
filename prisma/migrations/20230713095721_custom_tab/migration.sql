/*
  Warnings:

  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `customId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "userId",
ADD COLUMN     "customId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Custom" (
    "id" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "address" JSONB NOT NULL,

    CONSTRAINT "Custom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Custom_names_key" ON "Custom"("names");

-- CreateIndex
CREATE UNIQUE INDEX "Custom_email_key" ON "Custom"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Custom_telephone_key" ON "Custom"("telephone");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_customId_fkey" FOREIGN KEY ("customId") REFERENCES "Custom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
