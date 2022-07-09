/*
  Warnings:

  - You are about to drop the column `resortsId` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_resortsId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "resortsId",
ADD COLUMN     "prosId" INTEGER;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
