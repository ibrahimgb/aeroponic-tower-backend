import { Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';
import { changePumpIntervalDto } from './dot';

@Injectable()
export class AeroponicTowerService {
  constructor(private prisma: PrismaDbService) {}

  addTower(tower: any) {
    const newTower = this.prisma.aeroponicTower.create({
      data: {
        ...tower,
      },
    });

    return newTower;
  }

  async getAllAeroponicTowers() {
    const allAeroponicTowers = await this.prisma.aeroponicTower.findMany();
    return allAeroponicTowers;
  }

  async getAllPumpInterval() {
    const pumpInterval = await this.prisma.pumpInterval.findMany();
  }

  async newPumpInterval(pumpInterval: any) {
    const newPumpInterval = await this.prisma.pumpInterval.create({
      data: {
        ...pumpInterval,
      },
    });

    return newPumpInterval;
  }

  async changePumpInterval(data: changePumpIntervalDto) {
    const pumpIntervalDosExist = this.prisma.pumpInterval.findFirst({
      where: {
        timeOff: data.timeOff,
        timeOn: data.timeOn,
      },
    });

    if (pumpIntervalDosExist) {
      const towerSettingsChanged = this.prisma.aeroponicTower.update({
        where: {
          id: data.AeroponicTowerID,
        },
        data: {
          pumpIntervalID: (await pumpIntervalDosExist).id,
        },
      });
      return towerSettingsChanged;
    }
    const newPumpInterval = this.newPumpInterval({
      timeOff: data.timeOff,
      timeOn: data.timeOn,
    });
    const towerSettingsChanged = this.prisma.aeroponicTower.update({
      where: {
        id: data.AeroponicTowerID,
      },
      data: {
        pumpIntervalID: (await newPumpInterval).id,
      },
    });
  }
}
