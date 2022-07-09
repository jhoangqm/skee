-- DropForeignKey
ALTER TABLE "ClientsSkills" DROP CONSTRAINT "ClientsSkills_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "ClientsSkills" DROP CONSTRAINT "ClientsSkills_skillsId_fkey";

-- AddForeignKey
ALTER TABLE "ClientsSkills" ADD CONSTRAINT "ClientsSkills_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsSkills" ADD CONSTRAINT "ClientsSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
