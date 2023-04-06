import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PumpInterval } from '@prisma/client';
import { diskStorage } from 'multer';
import { join } from 'path';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { JwtGuard } from '../auth/guard';
import { AeroponicTowerService } from './aeroponic-tower.service';
import { AddAeroponicTowerDot, changePumpIntervalDto } from './dot';
import path = require('path');

const savedFileLocation = './uploads/towerImages';
export const storage = {
  storage: diskStorage({
    destination: savedFileLocation,
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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
    console.log('getting all');
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

  @Get('towerImage/:id')
  findProfileImage(@Param('id') id, @Res() res) {
    console.log('getting');

    this.aeroponicTowerService.getImageFileName(id).then((imagename) => {
      return of(
        res.sendFile(join(process.cwd(), savedFileLocation + '/' + imagename)),
      );
    });
  }

  //@UseGuards(JwtGuard)
  @Post('updatePumpInterval')
  updatePumpInterval(@Body() data: any) {
    console.log(data);

    return this.aeroponicTowerService.updatePumpInterval(
      data.pumpIntervalId,
      data.towerId,
    );
    // .pipe(
    //     tap((user: User) => console.log(user)),
    //     map((user:User) => ({profileImage: user.profileImage}))
    // )
  }

  @UseGuards(JwtGuard)
  @Post('uploadtowerImage/:id')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req, @Param('id') Id: string) {
    console.log(file);

    return this.aeroponicTowerService.addImage(file.filename, Id);
    // .pipe(
    //     tap((user: User) => console.log(user)),
    //     map((user:User) => ({profileImage: user.profileImage}))
    // )
  }

  @Get('get/:id')
  getTower(@Param('id') id) {
    console.log('tower');

    return this.aeroponicTowerService.getTower(id);
  }
}
