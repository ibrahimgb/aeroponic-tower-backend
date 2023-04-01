import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    //
  }

  @Get()
  user() {
    return this.userService.getUser();
  }

  @Post('newUser')
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }
  @Patch()
  editUser(@Body() user: any) {
    return this.userService.editUser(user);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Post('uploadAvatar')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req) {
    const user: User = req.user;

    return this.userService.addAvatar(file.filename, user.id);
    // .pipe(
    //     tap((user: User) => console.log(user)),
    //     map((user:User) => ({profileImage: user.profileImage}))
    // )
  }
}
