/*
  Warnings:

  - You are about to drop the column `prosId` on the `Bookings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_prosId_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "prosId",
ADD COLUMN     "proId" INTEGER;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pros"("id") ON DELETE SET NULL ON UPDATE CASCADE;
