import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { SensorData } from './dto';

import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private sensorService: SensorService) {
    //
  }

  @Post('newReading')
  addReading(@Body() sensor: SensorData) {
    return this.sensorService.addReading(sensor);
  }

  @Get('getReadings')
  getAllReadings(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('towerId') towerId: string,
  ) {
    return this.sensorService.getReadings(startDate, endDate, towerId);
  }

  @Get('getLastReadings')
  getLastReading(@Query('towerId') towerId: string) {
    return this.sensorService.getLastReadings(towerId);
  }
}
