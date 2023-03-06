/*
  Warnings:

  - You are about to drop the column `PumpIntervalID` on the `AeroponicTower` table. All the data in the column will be lost.
  - The primary key for the `SensorData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AeroponicTowerID` on the `SensorData` table. All the data in the column will be lost.
  - Added the required column `pumpIntervalID` to the `AeroponicTower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aeroponicTowerID` to the `SensorData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AeroponicTower" DROP CONSTRAINT "AeroponicTower_PumpIntervalID_fkey";

-- DropForeignKey
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_AeroponicTowerID_fkey";

-- AlterTable
ALTER TABLE "AeroponicTower" DROP COLUMN "PumpIntervalID",
ADD COLUMN     "pumpIntervalID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_pkey",
DROP COLUMN "AeroponicTowerID",
ADD COLUMN     "aeroponicTowerID" INTEGER NOT NULL,
ADD CONSTRAINT "SensorData_pkey" PRIMARY KEY ("model", "timeCaptured", "aeroponicTowerID");

-- AddForeignKey
ALTER TABLE "AeroponicTower" ADD CONSTRAINT "AeroponicTower_pumpIntervalID_fkey" FOREIGN KEY ("pumpIntervalID") REFERENCES "PumpInterval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_aeroponicTowerID_fkey" FOREIGN KEY ("aeroponicTowerID") REFERENCES "AeroponicTower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
