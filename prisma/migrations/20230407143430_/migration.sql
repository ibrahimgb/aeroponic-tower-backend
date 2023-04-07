/*
  Warnings:

  - You are about to drop the column `admin` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "admin",
ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mainAdminOf" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Group_adminId_key" ON "Group"("adminId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
