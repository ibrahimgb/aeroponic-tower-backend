import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import {SensorData} from "./dto"

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

  @Get('id')
  getAllReadings(@Param('id') id: string) {
    return this.sensorService.getReadings(id);
  }
}
