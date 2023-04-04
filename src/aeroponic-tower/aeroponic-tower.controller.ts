import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PumpInterval } from '@prisma/client';
import { AeroponicTowerService } from './aeroponic-tower.service';
import { AddAeroponicTowerDot, changePumpIntervalDto } from './dot';

@Controller('aeroponic-tower')
export class AeroponicTowerController {
  constructor(private aeroponicTowerService: AeroponicTowerService) {
    //
  }

  @Post('addtower')
  addTower(@Body() tower: AddAeroponicTowerDot) {
    return this.aeroponicTowerService.addTower(tower);
  }

  // @Get('pumpInterval')
  // pumpInterval() {
  //   return this.aeroponicTowerService.getAllPumpInterval();
  // }

  @Post('newPumpInterval')
  newPumpInterval(@Body() pumpInterval: PumpInterval) {
    return this.aeroponicTowerService.newPumpInterval(pumpInterval);
  }

  @Patch('changePumpInterval')
  changePumpInterval(@Body() data: changePumpIntervalDto) {
    return this.aeroponicTowerService.changePumpInterval(data);
  }

  @Get('all')
  all() {
    return this.aeroponicTowerService.getAllAeroponicTowers();
  }

  @Post('editTower')
  editTower(@Body() tower: AddAeroponicTowerDot) {
    return this.aeroponicTowerService.editTower(tower);
  }

  @Get('towerPumpInterval/:id')
  towerPumpInterval(@Param('id') id) {
    return this.aeroponicTowerService.getTowerPumpInterval(id);
  }

  @Get('allPumpIntervals')
  allPumpInterval() {
    return this.aeroponicTowerService.getAllPumpIntervals();
  }
}
