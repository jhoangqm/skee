/*
  Warnings:

  - You are about to drop the column `time` on the `timeSlots` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "timeSlots_time_key";

-- AlterTable
ALTER TABLE "timeSlots" DROP COLUMN "time";
