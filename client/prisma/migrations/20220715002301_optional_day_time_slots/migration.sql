/*
  Warnings:

  - Made the column `day` on table `timeSlots` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "timeSlots_day_key";

-- AlterTable
ALTER TABLE "timeSlots" ALTER COLUMN "day" SET NOT NULL;
