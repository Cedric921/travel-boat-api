-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_agenceId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "agenceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_agenceId_fkey" FOREIGN KEY ("agenceId") REFERENCES "Agence"("id") ON DELETE SET NULL ON UPDATE CASCADE;
