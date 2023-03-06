import { Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';
import { SensorData } from '@prisma/client';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaDbService) {}

  async addReading(reading: any) {
    reading.timeCaptured = new Date(reading.timeCaptured);
    const newReading = await this.prisma.sensorData.create({
      data: {
        ...reading,
      },
    });
  }

  async getReadings(id: number) {
    const readings = await this.prisma.sensorData.findMany({
      where: {
        aeroponicTowerID: id,
      },
    });
  }
}
