/*
  Warnings:

  - You are about to drop the column `phoneNUmber` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "phoneNUmber",
ADD COLUMN     "phoneNumber" INTEGER;
