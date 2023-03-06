import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDbService } from './prisma_db/prisma_db.service';
import { PrismaDbModule } from './prisma_db/prisma_db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SensorService } from './sensor/sensor.service';
import { SensorController } from './sensor/sensor.controller';
import { AeroponicTowerService } from './aeroponic-tower/aeroponic-tower.service';
import { AeroponicTowerController } from './aeroponic-tower/aeroponic-tower.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaDbModule,
    UserModule,
  ],
  controllers: [AppController, SensorController, AeroponicTowerController],
  providers: [AppService, PrismaDbService, SensorService, AeroponicTowerService],
})
export class AppModule {}
