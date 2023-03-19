import { Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';
import { SensorData } from '@prisma/client';
import {SensorData as FetchedSensorData} from "./dto"

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaDbService) {}

  async addReading(reading: FetchedSensorData) {
    const airoponicTower = await this.prisma.aeroponicTower.findFirst({
      where: {
        id: reading.AeroponicTowerId,
      },
    })
    try{
      const pumpInterval = await this.prisma.pumpInterval.create({
        data: {
          id:1,
          timeOff:25,
          timeOn:15
        },
      })
    }catch (error) {
      // console.error(error);
    }
    if(!airoponicTower){
      const newAiroponicTower = await this.prisma.aeroponicTower.create({
        data: {
          id:reading.AeroponicTowerId,
          pumpIntervalID: 1
        },
      })
    }
    console.log(airoponicTower);
    let time = new Date(0); 
    time.setUTCSeconds(reading.epochTime);
    const newReading = await this.prisma.sensorData.create({
      data: {
        aeroponicTowerID: reading.AeroponicTowerId,
        envTemp : reading.envTempAndHumidity.temperature,
        envHumidity: reading.envTempAndHumidity.humidity,
        insideTemp: reading.insideTempAndHumidity.temperature,
        insideHumidity: reading.insideTempAndHumidity.humidity,
        uvLight: reading.uvLight,
        waterNeedsRefilling: reading.waterNeedsRefilling,
        pumpIsWorking: reading.pumpIsWorking,
        timeCaptured: time
      },
    });
    const aeroponicTower = await this.prisma.aeroponicTower.findUnique({
      where: {
        id:reading.AeroponicTowerId
      },
    });
    const pumpInterval = await this.prisma.pumpInterval.findUnique({
      where: {
        id:aeroponicTower.pumpIntervalID
      },
    });


    return {timeOn : pumpInterval.timeOn,
            timeOff: pumpInterval.timeOff}
  }

  async getReadings(id: string) {
    const readings = await this.prisma.sensorData.findMany({
      where: {
        aeroponicTowerID: id,
      },
    });
  }
}
