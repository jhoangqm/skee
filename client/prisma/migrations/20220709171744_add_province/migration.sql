/*
  Warnings:

  - Added the required column `province` to the `Resorts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resorts" ADD COLUMN     "province" TEXT NOT NULL;
