import { Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';
import { SensorData as FetchedSensorData } from './dto';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaDbService) {}

  async addReading(reading: FetchedSensorData) {
    const airoponicTower = await this.prisma.aeroponicTower.findFirst({
      where: {
        id: reading.AeroponicTowerId,
      },
    });
    try {
      const pumpInterval = await this.prisma.pumpInterval.create({
        data: {
          id: 1,
          timeOff: 25,
          timeOn: 15,
        },
      });
    } catch (error) {
      // console.error(error);
    }
    if (!airoponicTower) {
      const newUser = await this.prisma.user.create({
        data: {
          firstName: 'ibrahim',
          lastName: 'gb',
          email: 'ibrahim.guoual.b@gmail.com',
          phoneNumber: 2136634235,
          hash: '$argon2id$v=19$m=65536,t=3,p=4$rDOSaMjqnjljwUa5GXIy1w$MUKax8Vrhr/jZR8oiQTZejhYAM93F3jyNn5VkXsMttg',
        },

        // {
        //   "firstName":"ibrahim",
        //   "email":"ibrahim.guoual.b@gmail.com",
        //   "password":"waahA3ami"
        // }
      });

      const newAiroponicTower = await this.prisma.aeroponicTower.create({
        data: {
          id: reading.AeroponicTowerId,
          pumpIntervalID: 1,
        },
      });

      const usersOnAeroponicTower =
        await this.prisma.usersOnAeroponicTower.create({
          data: {
            userId: newUser.id,
            aeroponicTowerId: newAiroponicTower.id,
          },
        });
    }
    console.log(airoponicTower);
    let time = new Date(0);
    time.setUTCSeconds(reading.epochTime);
    const id: string = reading.AeroponicTowerId;
    //console.log(reading);
    const newReading = await this.prisma.sensorData.create({
      data: {
        aeroponicTowerID: id,
        envTemp: reading.envTempAndHumidity.temperature,
        envHumidity: reading.envTempAndHumidity.humidity,
        insideTemp: reading.insideTempAndHumidity.temperature,
        insideHumidity: reading.insideTempAndHumidity.humidity,
        uvLight: reading.uvLight,
        waterNeedsRefilling: reading.waterNeedsRefilling,
        pumpIsWorking: reading.pumpIsWorking,
        timeCaptured: time,
        waterTemperature: reading.waterTemperature,
      },
    });
    const aeroponicTower = await this.prisma.aeroponicTower.findUnique({
      where: {
        id: reading.AeroponicTowerId,
      },
    });
    const pumpInterval = await this.prisma.pumpInterval.findUnique({
      where: {
        id: aeroponicTower.pumpIntervalID,
      },
    });

    return { timeOn: pumpInterval.timeOn, timeOff: pumpInterval.timeOff };
  }

  async getReadings(startDate: string, endDate: string, towerId: string) {
    console.log('startDate');
    console.log(startDate);
    console.log('endDate');
    console.log(endDate);

    console.log('towerId');
    console.log(towerId);

    const readings = await this.prisma.sensorData.findMany({
      where: {
        timeCaptured: {
          lte: new Date(endDate).toISOString(), // "2022-01-30T00:00:00.000Z"
          gte: new Date(startDate).toISOString(), // "2022-01-15T00:00:00.000Z"
        },
        aeroponicTowerID: towerId,
      },
    });

    return readings;
  }

  async getLastReadings(towerId: string) {
    const readings = await this.prisma.sensorData.findMany({
      where: {
        aeroponicTowerID: towerId,
      },
      orderBy: {
        timeCaptured: 'desc',
      },
      take: 2,
    });

    return readings;
  }
}
