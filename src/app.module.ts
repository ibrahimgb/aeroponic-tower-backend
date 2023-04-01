import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AeroponicTowerController } from './aeroponic-tower/aeroponic-tower.controller';
import { AeroponicTowerService } from './aeroponic-tower/aeroponic-tower.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma_db/prisma_db.module';
import { PrismaDbService } from './prisma_db/prisma_db.service';
import { SensorController } from './sensor/sensor.controller';
import { SensorService } from './sensor/sensor.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaDbModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, SensorController, AeroponicTowerController],
  providers: [
    AppService,
    PrismaDbService,
    SensorService,
    AeroponicTowerService,
  ],
})
export class AppModule {}
