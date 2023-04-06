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

  editTower(tower) {
    let img = null;

    if (tower.image) {
      img = tower.image;
    }

    const editedTower = this.prisma.aeroponicTower.update({
      where: {
        id: tower.id,
      },
      data: {
        name: tower.name,
        content: tower.content,
        size: Number(tower.size),
        image: img != null ? img : undefined, // If null, don't include in update!
      },
    });
    return editedTower;
  }

  getTowerPumpInterval(id) {
    const interval = this.prisma.pumpInterval.findFirst({
      where: {
        id: id,
      },
    });
    return interval;
  }

  getAllPumpIntervals() {
    const intervals = this.prisma.pumpInterval.findMany();
    return intervals;
  }

  async getAllAeroponicTowers() {
    const allAeroponicTowers = await this.prisma.aeroponicTower.findMany();
    return allAeroponicTowers;
  }

  // async getAllPumpInterval() {
  //   const pumpInterval = await this.prisma.pumpInterval.findMany();
  // }

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

  async addImage(filename: string, id: string) {
    const editedTower = await this.prisma.aeroponicTower.update({
      where: {
        id: id,
      },
      data: {
        image: filename,
      },
    });

    return editedTower;
  }

  async getImageFileName(id: string): Promise<string> {
    const res = await this.prisma.aeroponicTower.findFirst({
      where: {
        id: id,
      },
    });

    return res.image;
  }

  async getTower(id: string) {
    const res = await this.prisma.aeroponicTower.findFirst({
      where: {
        id: id,
      },
    });
    return res;
  }

  async updatePumpInterval(intervalID: number, towerId: string) {
    const editedTower = await this.prisma.aeroponicTower.update({
      where: {
        id: towerId,
      },
      data: {
        pumpIntervalID: intervalID,
      },
    });

    return editedTower;
  }
}
