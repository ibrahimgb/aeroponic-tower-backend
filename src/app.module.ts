import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDbService } from './prisma_db/prisma_db.service';
import { PrismaDbModule } from './prisma_db/prisma_db.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaDbModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaDbService],
})
export class AppModule {}
