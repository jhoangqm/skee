-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "prosId" INTEGER;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE SET NULL ON UPDATE CASCADE;
