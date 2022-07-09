/*
  Warnings:

  - You are about to drop the `ClientSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientSkills" DROP CONSTRAINT "ClientSkills_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "ClientSkills" DROP CONSTRAINT "ClientSkills_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "ProSkills" DROP CONSTRAINT "ProSkills_prosId_fkey";

-- DropForeignKey
ALTER TABLE "ProSkills" DROP CONSTRAINT "ProSkills_skillsId_fkey";

-- DropTable
DROP TABLE "ClientSkills";

-- DropTable
DROP TABLE "ProSkills";

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
