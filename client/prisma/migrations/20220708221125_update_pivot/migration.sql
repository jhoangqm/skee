/*
  Warnings:

  - You are about to drop the column `clientsId` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `prosId` on the `Skills` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_prosId_fkey";

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "clientsId",
DROP COLUMN "prosId";
