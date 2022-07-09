/*
  Warnings:

  - You are about to drop the `ClientsSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProsSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientsSkills" DROP CONSTRAINT "ClientsSkills_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "ClientsSkills" DROP CONSTRAINT "ClientsSkills_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "ProsSkills" DROP CONSTRAINT "ProsSkills_prosId_fkey";

-- DropForeignKey
ALTER TABLE "ProsSkills" DROP CONSTRAINT "ProsSkills_skillsId_fkey";

-- DropTable
DROP TABLE "ClientsSkills";

-- DropTable
DROP TABLE "ProsSkills";

-- CreateTable
CREATE TABLE "ClientSkills" (
    "id" SERIAL NOT NULL,
    "clientsId" INTEGER,
    "skillsId" INTEGER,

    CONSTRAINT "ClientSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProSkills" (
    "id" SERIAL NOT NULL,
    "prosId" INTEGER,
    "skillsId" INTEGER,

    CONSTRAINT "ProSkills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientSkills" ADD CONSTRAINT "ClientSkills_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientSkills" ADD CONSTRAINT "ClientSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProSkills" ADD CONSTRAINT "ProSkills_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProSkills" ADD CONSTRAINT "ProSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
