/*
  Warnings:

  - You are about to drop the column `name` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Pros` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Pros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Pros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pros" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
