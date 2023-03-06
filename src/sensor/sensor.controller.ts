import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private sensorService: SensorService) {
    //
  }

  @Post('newReading')
  addReading(@Body() sensor: any) {
    return this.sensorService.addReading(sensor);
  }

  @Get('id')
  getAllReadings(@Param('id') id: number) {
    return this.sensorService.getReadings(id);
  }
}
