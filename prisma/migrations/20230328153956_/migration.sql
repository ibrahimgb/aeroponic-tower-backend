-- CreateTable
CREATE TABLE "UsersOnAeroponicTower" (
    "userId" INTEGER NOT NULL,
    "aeroponicTowerId" TEXT NOT NULL,

    CONSTRAINT "UsersOnAeroponicTower_pkey" PRIMARY KEY ("userId","aeroponicTowerId")
);

-- AddForeignKey
ALTER TABLE "UsersOnAeroponicTower" ADD CONSTRAINT "UsersOnAeroponicTower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnAeroponicTower" ADD CONSTRAINT "UsersOnAeroponicTower_aeroponicTowerId_fkey" FOREIGN KEY ("aeroponicTowerId") REFERENCES "AeroponicTower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
