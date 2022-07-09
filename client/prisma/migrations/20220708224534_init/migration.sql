/*
  Warnings:

  - You are about to drop the `ClientsOnSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProsOnSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientsOnSkills" DROP CONSTRAINT "ClientsOnSkills_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "ClientsOnSkills" DROP CONSTRAINT "ClientsOnSkills_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "ProsOnSkills" DROP CONSTRAINT "ProsOnSkills_prosId_fkey";

-- DropForeignKey
ALTER TABLE "ProsOnSkills" DROP CONSTRAINT "ProsOnSkills_skillsId_fkey";

-- DropTable
DROP TABLE "ClientsOnSkills";

-- DropTable
DROP TABLE "ProsOnSkills";

-- CreateTable
CREATE TABLE "ClientsSkills" (
    "id" SERIAL NOT NULL,
    "clientsId" INTEGER,
    "skillsId" INTEGER,

    CONSTRAINT "ClientsSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProsSkills" (
    "id" SERIAL NOT NULL,
    "prosId" INTEGER,
    "skillsId" INTEGER,

    CONSTRAINT "ProsSkills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientsSkills" ADD CONSTRAINT "ClientsSkills_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsSkills" ADD CONSTRAINT "ClientsSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsSkills" ADD CONSTRAINT "ProsSkills_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsSkills" ADD CONSTRAINT "ProsSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
