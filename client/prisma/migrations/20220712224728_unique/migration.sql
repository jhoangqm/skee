/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `timeSlots` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "timeSlots" ALTER COLUMN "remainingTime" SET DEFAULT 6;

-- CreateIndex
CREATE UNIQUE INDEX "timeSlots_day_key" ON "timeSlots"("day");
