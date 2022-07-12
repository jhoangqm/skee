/*
  Warnings:

  - Made the column `firstName` on table `Clients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Clients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Pros` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Pros` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Clients" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pros" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
