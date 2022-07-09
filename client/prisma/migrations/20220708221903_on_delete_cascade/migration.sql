-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_resortsId_fkey";

-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_timeSlotsId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_resortsId_fkey";

-- DropForeignKey
ALTER TABLE "ClientsOnSkills" DROP CONSTRAINT "ClientsOnSkills_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "ClientsOnSkills" DROP CONSTRAINT "ClientsOnSkills_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "ProsOnSkills" DROP CONSTRAINT "ProsOnSkills_prosId_fkey";

-- DropForeignKey
ALTER TABLE "ProsOnSkills" DROP CONSTRAINT "ProsOnSkills_skillsId_fkey";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_resortsId_fkey" FOREIGN KEY ("resortsId") REFERENCES "Resorts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_resortsId_fkey" FOREIGN KEY ("resortsId") REFERENCES "Resorts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_timeSlotsId_fkey" FOREIGN KEY ("timeSlotsId") REFERENCES "timeSlots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnSkills" ADD CONSTRAINT "ClientsOnSkills_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnSkills" ADD CONSTRAINT "ClientsOnSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsOnSkills" ADD CONSTRAINT "ProsOnSkills_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsOnSkills" ADD CONSTRAINT "ProsOnSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
