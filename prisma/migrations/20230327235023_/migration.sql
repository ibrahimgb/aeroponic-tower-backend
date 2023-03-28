/*
  Warnings:

  - Added the required column `waterTemperature` to the `SensorData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AeroponicTower" ADD COLUMN     "name" TEXT,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SensorData" ADD COLUMN     "waterTemperature" DOUBLE PRECISION NOT NULL;
