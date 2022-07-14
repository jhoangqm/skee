-- AlterTable
ALTER TABLE "Pros" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Resorts" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'this is a mountain description';

-- AlterTable
ALTER TABLE "timeSlots" ADD COLUMN     "prosId" INTEGER;

-- AddForeignKey
ALTER TABLE "timeSlots" ADD CONSTRAINT "timeSlots_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE SET NULL ON UPDATE CASCADE;
