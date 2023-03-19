-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PumpInterval" (
    "id" SERIAL NOT NULL,
    "timeOff" INTEGER NOT NULL DEFAULT 25,
    "timeOn" INTEGER NOT NULL DEFAULT 15,
    "description" TEXT,

    CONSTRAINT "PumpInterval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AeroponicTower" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "pumpIntervalID" INTEGER NOT NULL,

    CONSTRAINT "AeroponicTower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorData" (
    "model" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "sensorReading" DOUBLE PRECISION NOT NULL,
    "timeCaptured" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aeroponicTowerID" INTEGER NOT NULL,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("model","timeCaptured","aeroponicTowerID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "AeroponicTower" ADD CONSTRAINT "AeroponicTower_pumpIntervalID_fkey" FOREIGN KEY ("pumpIntervalID") REFERENCES "PumpInterval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_aeroponicTowerID_fkey" FOREIGN KEY ("aeroponicTowerID") REFERENCES "AeroponicTower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
