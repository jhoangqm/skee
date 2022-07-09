/*
  Warnings:

  - You are about to drop the column `clientsId` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `resortsId` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `clientsId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `prosId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `clientsId` on the `ClientsSkills` table. All the data in the column will be lost.
  - You are about to drop the column `skillsId` on the `ClientsSkills` table. All the data in the column will be lost.
  - You are about to drop the column `resortsId` on the `Pros` table. All the data in the column will be lost.
  - You are about to drop the column `prosId` on the `ProsSkills` table. All the data in the column will be lost.
  - You are about to drop the column `skillsId` on the `ProsSkills` table. All the data in the column will be lost.
  - You are about to drop the column `clientsId` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `prosId` on the `Reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_resortsId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_prosId_fkey";

-- DropForeignKey
ALTER TABLE "ClientsSkills" DROP CONSTRAINT "ClientsSkills_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "ClientsSkills" DROP CONSTRAINT "ClientsSkills_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "Pros" DROP CONSTRAINT "Pros_resortsId_fkey";

-- DropForeignKey
ALTER TABLE "ProsSkills" DROP CONSTRAINT "ProsSkills_prosId_fkey";

-- DropForeignKey
ALTER TABLE "ProsSkills" DROP CONSTRAINT "ProsSkills_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_prosId_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "clientsId",
DROP COLUMN "resortsId",
ADD COLUMN     "clientId" INTEGER,
ADD COLUMN     "resortId" INTEGER;

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "clientsId",
DROP COLUMN "prosId",
ADD COLUMN     "clientId" INTEGER,
ADD COLUMN     "proId" INTEGER;

-- AlterTable
ALTER TABLE "ClientsSkills" DROP COLUMN "clientsId",
DROP COLUMN "skillsId",
ADD COLUMN     "clientId" INTEGER,
ADD COLUMN     "skillId" INTEGER;

-- AlterTable
ALTER TABLE "Pros" DROP COLUMN "resortsId",
ADD COLUMN     "resortId" INTEGER;

-- AlterTable
ALTER TABLE "ProsSkills" DROP COLUMN "prosId",
DROP COLUMN "skillsId",
ADD COLUMN     "proId" INTEGER,
ADD COLUMN     "skillId" INTEGER;

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "clientsId",
DROP COLUMN "prosId",
ADD COLUMN     "clientId" INTEGER,
ADD COLUMN     "proId" INTEGER;

-- AddForeignKey
ALTER TABLE "Pros" ADD CONSTRAINT "Pros_resortId_fkey" FOREIGN KEY ("resortId") REFERENCES "Resorts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_resortId_fkey" FOREIGN KEY ("resortId") REFERENCES "Resorts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pros"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsSkills" ADD CONSTRAINT "ClientsSkills_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsSkills" ADD CONSTRAINT "ClientsSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsSkills" ADD CONSTRAINT "ProsSkills_proId_fkey" FOREIGN KEY ("proId") REFERENCES "Pros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsSkills" ADD CONSTRAINT "ProsSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
