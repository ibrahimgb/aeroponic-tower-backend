/*
  Warnings:

  - You are about to drop the column `groupId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.
  - Added the required column `admin` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_groupId_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "admin" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "groupId",
DROP COLUMN "isAdmin";

-- CreateTable
CREATE TABLE "UsersOnGroup" (
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnGroup_pkey" PRIMARY KEY ("userId","groupId")
);

-- AddForeignKey
ALTER TABLE "UsersOnGroup" ADD CONSTRAINT "UsersOnGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnGroup" ADD CONSTRAINT "UsersOnGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
