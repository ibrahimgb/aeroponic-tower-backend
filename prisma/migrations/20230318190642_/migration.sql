/*
  Warnings:

  - The primary key for the `AeroponicTower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SensorData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `model` on the `SensorData` table. All the data in the column will be lost.
  - You are about to drop the column `sensorReading` on the `SensorData` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `SensorData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `AeroponicTower` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `envHumidity` to the `SensorData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `envTemp` to the `SensorData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insideHumidity` to the `SensorData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insideTemp` to the `SensorData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pumpIsWorking` to the `SensorData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uvLight` to the `SensorData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterNeedsRefilling` to the `SensorData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_aeroponicTowerID_fkey";

-- AlterTable
ALTER TABLE "AeroponicTower" DROP CONSTRAINT "AeroponicTower_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "AeroponicTower_id_seq";

-- AlterTable
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_pkey",
DROP COLUMN "model",
DROP COLUMN "sensorReading",
DROP COLUMN "unit",
ADD COLUMN     "envHumidity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "envTemp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "insideHumidity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "insideTemp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pumpIsWorking" BOOLEAN NOT NULL,
ADD COLUMN     "uvLight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "waterNeedsRefilling" BOOLEAN NOT NULL,
ALTER COLUMN "timeCaptured" DROP DEFAULT,
ALTER COLUMN "aeroponicTowerID" SET DATA TYPE TEXT,
ADD CONSTRAINT "SensorData_pkey" PRIMARY KEY ("timeCaptured", "aeroponicTowerID");

-- CreateIndex
CREATE UNIQUE INDEX "AeroponicTower_id_key" ON "AeroponicTower"("id");

-- AddForeignKey
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_aeroponicTowerID_fkey" FOREIGN KEY ("aeroponicTowerID") REFERENCES "AeroponicTower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
